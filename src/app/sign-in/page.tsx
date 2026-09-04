import Link from "next/link";
import { SignInForm } from "./sign-in-form";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

// A plain /sign-in route. The old folder was [[...sign-in]], an optional
// catch-all, because Clerk's widget drove its own sub-steps underneath that
// path. We own the whole flow now, and it is one screen, so it is one route.
export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
      <div className="w-full max-w-sm">
        <h1 className="font-board mb-6 text-center text-2xl tracking-widest">
          FLIGHTLOG
        </h1>
        <SignInForm />
        <p className="mt-4 text-center text-sm text-zinc-500">
          No account?{" "}
          <Link href="/sign-up" className="text-zinc-200 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
