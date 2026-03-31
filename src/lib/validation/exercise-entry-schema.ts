import z from "zod/v4";

export const exerciseEntrySchema = z.object({
  exerciseId: z.uuid(),
  weight: z.number().positive("Weight must be positive."),
  reps: z.int().positive("Reps must be at least 1."),
});

export type ExerciseEntrySchema = z.infer<typeof exerciseEntrySchema>;
