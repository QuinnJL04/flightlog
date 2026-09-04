"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, destroySession } from "@/lib/session";

/**
 * What every auth action returns: a serializable object the form can render,
 * never a thrown error.
 */
export type AuthState = { error?: string };

const MIN_PASSWORD_LENGTH = 8;

// Deliberately loose. Real address validation is a swamp (see RFC 5322), and
// the only check that actually proves an address works is sending mail to it.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pull email and password out of the form, or null if either is missing.
 *
 * The email is trimmed and lowercased. The password deliberately is not —
 * trimming it would silently change what someone typed, and " hunter2" and
 * "hunter2" must stay different passwords.
 *
 * Not implemented yet.
 */
function readCredentials(
  formData: FormData,
): { email: string; password: string } | null {
  void formData;
  return null;
}

/**
 * Create an account.
 *
 * A row with a null passwordHash is the account prisma/seed.ts made, holding
 * the flights logged before auth existed, so signing up with that email
 * updates the row rather than colliding with the unique constraint. That is
 * only safe because the seed script is the one thing that can create a
 * password-less user — if an invite or OAuth flow is ever added, this branch
 * becomes "anyone who guesses an email steals the account" and must go.
 *
 * Not implemented yet.
 */
export async function signUp(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  void formData;
  void readCredentials;
  void prisma;
  void hashPassword;
  void createSession;
  void redirect;
  void EMAIL_PATTERN;
  void MIN_PASSWORD_LENGTH;
  return { error: "Not implemented yet." };
}

/**
 * Sign in.
 *
 * Both failure modes must be indistinguishable. "No account with that email"
 * and "wrong password" share one message, otherwise the form becomes a tool for
 * discovering which addresses have accounts here. And verifyPassword runs even
 * when the user does not exist (it returns false for a null hash), because
 * returning early on "no such user" is ~100ms faster and leaks by timing
 * exactly what the shared message was hiding.
 *
 * Not implemented yet.
 */
export async function signIn(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  void formData;
  void verifyPassword;
  return { error: "Not implemented yet." };
}

/**
 * Sign out. Wired to a plain <form action={signOut}>, so it takes no arguments
 * and has no error to report.
 *
 * Not implemented yet.
 */
export async function signOut(): Promise<void> {
  void destroySession;
}
