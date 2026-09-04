import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

// This used to be Clerk's <Show when="signed-in">. Now that we own sessions,
// the check is a plain await and a ternary — the page is a Server Component, so
// it can ask the database who this is before rendering. No provider, no
// client-side flicker, no library.
export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-board text-4xl tracking-widest text-zinc-100">
          FLIGHTLOG
        </h1>
        <p className="text-zinc-400">
          Log where you&apos;ve flown. See it on a map.
        </p>

        {user ? (
          <Link
            href="/dashboard"
            className="rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900"
          >
            Go to dashboard →
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/sign-up"
              className="rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900"
            >
              Create account
            </Link>
            <Link
              href="/sign-in"
              className="rounded border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100"
            >
              Sign in
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
