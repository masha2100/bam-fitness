import { z } from 'zod';

export const WorkoutLogSchema = z.object({
  templateId: z.string().min(1),
  durationSec: z.number().int().nonnegative(),
  exercises: z.array(z.object({
    id: z.string(),
    sets: z.array(z.object({
      reps: z.coerce.number().int().positive(),
      weight: z.coerce.number().positive(),
      completed: z.boolean(),
    })).min(1),
  })), 
});

export const WorkoutLogExerciseSchema = z.object({
  id: z.string(),
  sets: z.array(WorkoutLogSetSchema),
});

export const WorkoutLogSchema = z.object({
  templateId: z.string(),
  durationSec: z.number().int().nonnegative(),
  exercises: z.array(WorkoutLogExerciseSchema),
});

export type WorkoutLogForm = z.infer<typeof WorkoutLogSchema>;