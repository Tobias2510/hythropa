"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { exerciseEntry } from "@/db/schema";
import { exerciseEntrySchema } from "@/lib/validation/exercise-entry-schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod/v4";
import { eq } from "drizzle-orm";

export async function createExerciseEntry(data: {
  exerciseId: string;
  weight: number;
  reps: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = exerciseEntrySchema.parse(data);

  await db.insert(exerciseEntry).values({
    exerciseId: parsed.exerciseId,
    weight: parsed.weight,
    reps: parsed.reps,
  });

  revalidatePath(`/sessions`);
}

const idSchema = z.uuid();

export async function deleteExerciseEntry(
  entryId: string,
  exerciseId: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsedId = idSchema.parse(entryId);
  idSchema.parse(exerciseId);

  await db.delete(exerciseEntry).where(eq(exerciseEntry.id, parsedId));

  revalidatePath(`/sessions`);
}
