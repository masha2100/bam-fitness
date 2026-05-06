import { z } from 'zod';

export const WorkoutLogSetSchema = z.object({
  reps: z.coerce.number().int().positive('Reps must be > 0'),
  weight: z.coerce.number().positive('Weight must be > 0'),
  completed: z.boolean(),
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