import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function SessionNotFound() {
  return (
    <div className="min-h-svh px-4 py-6">
      <div className="mx-auto flex w-full max-w-lg items-center justify-center pt-32">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Dumbbell />
            </EmptyMedia>
            <EmptyTitle>Session Not Found</EmptyTitle>
            <EmptyDescription>
              This session doesn&apos;t exist or you don&apos;t have access to
              it.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/sessions">Back to Sessions</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}
