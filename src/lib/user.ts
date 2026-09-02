import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Bridges Clerk's identity to our own `User` row.
 *
 * Clerk knows who is logged in, but it doesn't know about trips or flights —
 * those live in our Postgres database and need a local `User.id` to hang off.
 * So on every request we translate a Clerk user id into our own user record,
 * creating or linking it the first time we see it.
 *
 * Returns null when nobody is signed in. Callers must handle that; the page
 * calls auth.protect(), but a Server Action can be POSTed to directly, so
 * never assume a session exists.
 *
 * TODO(you) 5 — Deduplicate this.
 *
 * Right now one "log flight" click runs this function TWICE: once inside the
 * Server Action, and once again when revalidatePath() re-renders the page.
 * Same user, same request, two identical trips to Virginia.
 *
 * React ships a `cache` helper that memoises a function for the lifetime of a
 * single server request. Wrapping this in it collapses the second call into a
 * cache hit, with no other code changes — every caller keeps working.
 *
 * Steps:
 *   1. `import { cache } from "react";` at the top of this file.
 *   2. Turn this into `export const getCurrentUser = cache(async () => {...});`
 *      Note it becomes a `const` holding a wrapped function, not a
 *      `function` declaration. The body does not change at all.
 *   3. Count queries before and after (see the procedure I gave you).
 *
 * Gotcha: `cache()` only dedupes within ONE request. Two separate clicks are
 * two separate requests and will each query again. That is correct behaviour —
 * it is a request-scoped dedupe, not a data cache.
 */
export async function getCurrentUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  // Fast path: we've seen this Clerk account before.
  const linked = await prisma.user.findUnique({ where: { clerkId } });
  if (linked) return linked;

  // First sign-in for this Clerk account. Fetch the profile for their email.
  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error("Clerk user has no primary email address.");
  }

  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  // `upsert` on email handles both cases in one query: an existing row from
  // the old seed script gets its clerkId filled in, and a genuinely new user
  // gets created. Without this, signing in as the seeded user would hit the
  // unique constraint on `email` and blow up.
  return prisma.user.upsert({
    where: { email },
    update: { clerkId },
    create: { email, clerkId, name },
  });
}

/** Same, but throws instead of returning null. For pages behind middleware. */
export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in.");
  return user;
}
