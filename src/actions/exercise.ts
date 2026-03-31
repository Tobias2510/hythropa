"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { exercise } from "@/db/schema";
import { exerciseSchema } from "@/lib/validation/exercise-schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod/v4";
import { eq } from "drizzle-orm";

export async function createExercise(data: {
  name: string;
  sessionId: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = exerciseSchema.parse(data);

  await db.insert(exercise).values({
    name: parsed.name,
    sessionId: parsed.sessionId,
  });

  revalidatePath(`/sessions/${parsed.sessionId}`);
}

const idSchema = z.uuid();

export async function deleteExercise(
  exerciseId: string,
  sessionId: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsedId = idSchema.parse(exerciseId);
  const parsedSessionId = idSchema.parse(sessionId);

  await db.delete(exercise).where(eq(exercise.id, parsedId));

  revalidatePath(`/sessions/${parsedSessionId}`);
}

const notesSchema = z.object({
  exerciseId: z.uuid(),
  notes: z.string().max(500, "Notes are too long."),
});

export async function updateExerciseNotes(data: {
  exerciseId: string;
  notes: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = notesSchema.parse(data);

  await db
    .update(exercise)
    .set({ notes: parsed.notes || null })
    .where(eq(exercise.id, parsed.exerciseId));

  revalidatePath(`/sessions`);
}
