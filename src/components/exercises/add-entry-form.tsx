"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  exerciseEntrySchema,
  type ExerciseEntrySchema,
} from "@/lib/validation/exercise-entry-schema";
import { createExerciseEntry } from "@/actions/exercise-entry";
import { updateExerciseNotes } from "@/actions/exercise";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export function AddEntryForm({
  exerciseId,
  lastWeight,
  lastReps,
  notes,
}: {
  exerciseId: string;
  lastWeight?: number;
  lastReps?: number;
  notes?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes ?? "");

  const form = useForm<ExerciseEntrySchema>({
    resolver: zodResolver(exerciseEntrySchema),
    defaultValues: {
      exerciseId,
      weight: lastWeight,
      reps: lastReps,
    },
  });

  async function onSubmit(data: ExerciseEntrySchema) {
    setLoading(true);
    try {
      await createExerciseEntry(data);
      toast.success("Entry logged");
    } catch {
      form.setError("root", { message: "Failed to log entry." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveNotes() {
    setNotesLoading(true);
    try {
      await updateExerciseNotes({ exerciseId, notes: currentNotes });
      toast.success("Notes saved");
    } catch {
      toast.error("Failed to save notes.");
    } finally {
      setNotesLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <Controller
            name="weight"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="weight">Weight (kg)</FieldLabel>
                <Input
                  {...field}
                  id="weight"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="0"
                  aria-invalid={fieldState.invalid}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="reps"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reps">Reps</FieldLabel>
                <Input
                  {...field}
                  id="reps"
                  type="number"
                  min="1"
                  placeholder="0"
                  aria-invalid={fieldState.invalid}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}
        <Button type="submit" disabled={loading}>
          {loading && <Spinner />}
          Log Entry
        </Button>
      </form>

      <div className="flex flex-col gap-2">
        <Field>
          <FieldLabel htmlFor="notes">Notes</FieldLabel>
          <Textarea
            id="notes"
            value={currentNotes}
            onChange={(e) => setCurrentNotes(e.target.value)}
          />
        </Field>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveNotes}
          disabled={notesLoading || currentNotes === (notes ?? "")}
        >
          {notesLoading && <Spinner />}
          Save Notes
        </Button>
      </div>
    </div>
  );
}
