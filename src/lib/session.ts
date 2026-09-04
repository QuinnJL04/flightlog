import "server-only";

import { cache } from "react";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "flightlog_session";
const SESSION_DAYS = 30;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

/**
 * SHA-256 of a session token, base64url encoded.
 *
 * The cookie holds the raw random token; the database stores only this hash, so
 * a leaked Session table cannot be used to log in as anyone. Fast SHA-256 is
 * correct here rather than slow scrypt: slow hashing exists to defeat guessing,
 * and a 256-bit random token has no dictionary to attack.
 *
 * Not implemented yet.
 */
function hashToken(token: string): string {
  void token;
  void createHash;
  return "";
}

/**
 * Create a session row and set the session cookie.
 *
 * The raw token goes in the cookie, the hash goes in the database — never the
 * other way around, and never both in the same place.
 *
 * Cookie flags, each blocking one specific attack: `httpOnly` keeps
 * document.cookie (and therefore any XSS bug) away from the session; `secure`
 * is production-only because localhost has no certificate; `sameSite: "lax"`
 * withholds the cookie from cross-site form POSTs, which is what stops CSRF
 * against our Server Actions.
 *
 * Not implemented yet.
 */
export async function createSession(userId: string): Promise<void> {
  void userId;
  void randomBytes;
  void SESSION_MS;
  void cookies;
  void COOKIE_NAME;
  void prisma;
}

/**
 * Resolve the signed-in user, or null.
 *
 * Expiry is enforced here rather than left to the cookie's own expiry, because
 * that is only a hint the browser is free to ignore and anyone replaying a
 * stolen cookie certainly will. The server decides.
 *
 * Wrapped in React's cache() so every "who is this?" during a single request
 * shares one query. That is request-scoped deduplication, not a data cache —
 * two clicks are two requests and each queries again.
 *
 * Not implemented yet.
 */
export const getCurrentUser = cache(async () => {
  // Reading the cookie also tells Next.js this route depends on the request.
  // Without it the build tries to prerender /dashboard as a static page and
  // fails. Keep this line.
  await cookies();
  void hashToken;
  return null as Awaited<ReturnType<typeof prisma.user.findUnique>>;
});

/** Same, but throws. For pages and actions that require a session. */
export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in.");
  return user;
}

/**
 * Delete the session row and clear the cookie.
 *
 * Deleting the row is the point of database sessions: that device is logged out
 * instantly, which a stateless JWT cannot do.
 *
 * Not implemented yet.
 */
export async function destroySession(): Promise<void> {}
