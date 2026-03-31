"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  exerciseSchema,
  type ExerciseSchema,
} from "@/lib/validation/exercise-schema";
import { createExercise } from "@/actions/exercise";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddExerciseDrawer({ sessionId }: { sessionId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: { name: "", sessionId },
  });

  async function onSubmit(data: ExerciseSchema) {
    setLoading(true);
    try {
      await createExercise(data);
      setOpen(false);
      form.reset();
      toast.success("Exercise added");
    } catch {
      form.setError("root", { message: "Failed to add exercise." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <DrawerTrigger asChild>
        <button
          type="button"
          className="border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-foreground active:bg-primary/5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed py-4 text-sm transition-colors"
        >
          <Plus className="size-4" />
          Add Exercise
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New Exercise</DrawerTitle>
          <DrawerDescription>
            Give your exercise a name.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="exercise-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="exercise-name"
                  placeholder="e.g. Bench Press"
                  autoFocus
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {form.formState.errors.root && (
            <FieldError
              className="text-destructive mt-2 text-sm"
              errors={[form.formState.errors.root]}
            />
          )}
        </form>

        <DrawerFooter>
          <Button disabled={loading} onClick={form.handleSubmit(onSubmit)}>
            {loading && <Spinner />}
            Add Exercise
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
