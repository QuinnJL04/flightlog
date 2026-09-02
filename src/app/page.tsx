import Link from "next/link";
import { Show } from "@clerk/nextjs";

// <Show> renders its children when the condition passes, and `fallback`
// otherwise. It replaced <SignedIn>/<SignedOut>, which Clerk removed in
// Core 3 (March 2026) — importing those now is a compile error, not a warning.
// It works in Server Components, so the correct links are in the HTML from the
// start rather than flickering in after JavaScript loads.
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-board text-4xl tracking-widest text-zinc-100">
          FLIGHTLOG
        </h1>
        <p className="text-zinc-400">
          Log where you&apos;ve flown. See it on a map.
        </p>

        <Show
          when="signed-in"
          fallback={
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
          }
        >
          <Link
            href="/dashboard"
            className="rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900"
          >
            Go to dashboard →
          </Link>
        </Show>
      </main>
    </div>
  );
}
