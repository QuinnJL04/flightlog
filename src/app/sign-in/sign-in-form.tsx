"use client";

import { signIn } from "@/app/auth/actions";

/**
 * The sign-in form.
 *
 * "use client" does not mean "runs only in the browser" — it means "ships to
 * the browser too", and the component still server-renders for the initial
 * HTML. It is here because hooks need state that survives between renders, and
 * the server does not keep the component around to hold any.
 *
 * Not built yet.
 */
export function SignInForm() {
  void signIn;
  return <p className="text-sm text-zinc-500">Sign-in form not built yet.</p>;
}
