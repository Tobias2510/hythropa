"use client";

import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Trash2, Dumbbell } from "lucide-react";

type Session = {
  id: string;
  name: string;
};

const mockSessions: Session[] = [
  { id: "1", name: "Upper Body" },
  { id: "2", name: "Lower Body" },
];

export function SessionList() {
  const sessions = mockSessions;

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-muted-foreground">No sessions yet.</p>
        <AddSessionButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sessions.map((session) => (
        <Card
          key={session.id}
          className="cursor-pointer border-0 bg-muted/40 ring-0 transition-colors hover:bg-muted/60 active:bg-muted/80"
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Dumbbell className="size-4 text-primary" />
              </div>
              <CardTitle>{session.name}</CardTitle>
            </div>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2 />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
        </Card>
      ))}

      <AddSessionButton />
    </div>
  );
}

function AddSessionButton() {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/20 py-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground active:bg-primary/5"
    >
      <Plus className="size-4" />
      Add Session
    </button>
  );
}
