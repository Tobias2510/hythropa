import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SessionList } from "@/components/home/session-list";
import { UserMenu } from "@/components/home/user-menu";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { name, email } = session.user;

  return (
    <div className="min-h-svh px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs font-medium tracking-widest text-primary uppercase">
              Dashboard
            </p>
            <h1 className="text-2xl font-bold tracking-tight">
              Your Sessions
            </h1>
          </div>
          <UserMenu name={name} email={email} />
        </header>
        <SessionList />
      </div>
    </div>
  );
}
