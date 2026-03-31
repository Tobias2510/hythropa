"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2 } from "lucide-react";
import { deleteExerciseEntry } from "@/actions/exercise-entry";
import { toast } from "sonner";

type Entry = {
  id: string;
  weight: number;
  reps: number;
  createdAt: Date;
};

export function EntryHistory({
  entries,
  exerciseId,
}: {
  entries: Entry[];
  exerciseId: string;
}) {
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium tracking-wide">History</h2>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} exerciseId={exerciseId} />
      ))}
    </div>
  );
}

function EntryCard({
  entry,
  exerciseId,
}: {
  entry: Entry;
  exerciseId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteExerciseEntry(entry.id, exerciseId);
    } catch {
      toast.error("Failed to delete entry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-muted/40 border-0 ring-0">
      <CardHeader className="items-center">
        <div className="flex flex-col gap-0.5">
          <CardTitle className="text-sm">
            {entry.weight} kg × {entry.reps} reps
          </CardTitle>
          <p className="text-muted-foreground text-xs">
            {entry.createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <CardAction className="self-center">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Spinner /> : <Trash2 className="size-3.5" />}
            <span className="sr-only">Delete entry</span>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
