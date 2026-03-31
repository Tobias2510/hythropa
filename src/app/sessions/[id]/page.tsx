import { ExerciseList } from "@/components/exercises/exercise-list";
import { UserMenu } from "@/components/sessions/user-menu";
import { Button } from "@/components/ui/button";
import { exercise, trainingSession } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { and, desc, eq } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { name, email } = session.user;

  const [found] = await db
    .select({ id: trainingSession.id, name: trainingSession.name })
    .from(trainingSession)
    .where(
      and(
        eq(trainingSession.id, id),
        eq(trainingSession.userId, session.user.id),
      ),
    );

  if (!found) notFound();

  const exercises = await db
    .select({ id: exercise.id, name: exercise.name })
    .from(exercise)
    .where(eq(exercise.sessionId, found.id))
    .orderBy(desc(exercise.createdAt));

  return (
    <div className="min-h-svh px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/sessions">
                <ChevronLeft />
                <span className="sr-only">Back to sessions</span>
              </Link>
            </Button>
            <div>
              <p className="text-primary mb-1 text-xs font-medium tracking-widest uppercase">
                Session
              </p>
              <h1 className="text-2xl font-bold tracking-tight">
                {found.name}
              </h1>
            </div>
          </div>
          <UserMenu name={name} email={email} />
        </header>
        <ExerciseList exercises={exercises} sessionId={found.id} />
      </div>
    </div>
  );
}
