import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../db/supabase';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/workout/routines
router.get('/routines', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { data: routines } = await supabase
    .from('routines')
    .select(`
      id,
      name,
      estimated_minutes,
      routine_exercises(count)
    `);

  if (!routines) {
    res.json([]);
    return;
  }

  const result = routines.map((r: any) => ({
    id: r.id,
    name: r.name,
    estimatedMinutes: r.estimated_minutes,
    exerciseCount: r.routine_exercises[0]?.count || 0,
  }));

  res.json(result);
});

// GET /api/workout/routine/:id
router.get('/routine/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { data: routine } = await supabase
    .from('routines')
    .select(`
      id,
      name,
      routine_exercises(
        sort_order,
        default_sets,
        exercises(id, name, tags)
      )
    `)
    .eq('id', id)
    .single();

  if (!routine) {
    res.status(404).json({ error: { message: 'Routine not found' } });
    return;
  }

  const exercises = (routine as any).routine_exercises
    .sort((a: any, b: any) => a.sort_order - b.sort_order)
    .map((re: any) => ({
      id: re.exercises.id,
      name: re.exercises.name,
      tags: re.exercises.tags,
      defaultSets: re.default_sets,
    }));

  res.json({
    id: routine.id,
    name: routine.name,
    exercises,
  });
});

// POST /api/workout/log
const WorkoutLogSchema = z.object({
  templateId: z.string(),
  durationSec: z.number().int().nonnegative(),
  exercises: z.array(z.object({
    id: z.string(),
    sets: z.array(z.object({
      reps: z.number().int().positive(),
      weight: z.number().positive(),
      completed: z.boolean(),
    })),
  })),
});

router.post('/log', authMiddleware, async (req: AuthRequest, res: Response) => {
  const parsed = WorkoutLogSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: { message: 'Invalid data', details: parsed.error.issues } });
    return;
  }

  const { templateId, durationSec, exercises } = parsed.data;
  const userId = req.userId!;

  const sets = exercises.flatMap((exercise) =>
    exercise.sets.map((set, index) => ({
      exercise_id: exercise.id,
      set_number: index + 1,
      reps: set.reps,
      weight: set.weight,
      completed: set.completed,
    }))
  );

  const { data, error } = await supabase.rpc('insert_workout_log', {
    p_user_id: userId,
    p_routine_id: templateId,
    p_duration_sec: durationSec,
    p_sets: JSON.stringify(sets),
  });

  if (error) {
    res.status(500).json({ error: { message: 'Failed to save workout' } });
    return;
  }

  res.status(201).json({ id: data });
});

export default router;