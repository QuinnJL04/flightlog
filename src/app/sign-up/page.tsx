import Link from "next/link";
import { SignUpForm } from "./sign-up-form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function SignUpPage() {
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
        <SignUpForm />
        <p className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-zinc-200 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
