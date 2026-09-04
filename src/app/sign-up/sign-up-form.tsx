"use client";

import { signUp } from "@/app/auth/actions";

/**
 * The sign-up form. Same shape as the sign-in form, plus an optional name
 * field.
 *
 * Note that an input's `minLength` is a convenience, not a check — it only
 * stops the browser from submitting, and anyone can POST straight to the Server
 * Action and skip it. The real validation is the one in signUp, on the server.
 * Client-side validation is UX; server-side validation is security.
 *
 * Not built yet.
 */
export function SignUpForm() {
  void signUp;
  return <p className="text-sm text-zinc-500">Sign-up form not built yet.</p>;
}
