"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, Pencil, Trash2, Dumbbell } from "lucide-react";
import { AddSessionDrawer } from "./add-session-drawer";

type Session = {
  id: string;
  name: string;
};

export function SessionList({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-muted-foreground">No sessions yet.</p>
        <AddSessionDrawer />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}

      <AddSessionDrawer />
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="bg-muted/40 hover:bg-muted/60 active:bg-muted/80 cursor-pointer border-0 ring-0 transition-colors">
      <CardHeader className="items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
            <Dumbbell className="text-primary size-4" />
          </div>
          <CardTitle>{session.name}</CardTitle>
        </div>
        <CardAction className="self-center">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="size-5" />
                <span className="sr-only">Actions</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{session.name}</DrawerTitle>
                <DrawerDescription>Session options</DrawerDescription>
              </DrawerHeader>

              <nav className="flex flex-col gap-1 px-4 pb-4">
                <button
                  type="button"
                  className="text-foreground hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Pencil className="text-muted-foreground size-4" />
                  Edit
                </button>
                <Separator />
                <button
                  type="button"
                  className="text-destructive hover:bg-destructive/10 flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </nav>
            </DrawerContent>
          </Drawer>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
