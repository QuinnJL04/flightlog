import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

declare global {
  var prismaClient: InstanceType<typeof PrismaClient> | undefined;
}

/**
 * Neon hands us `?sslmode=require`. Today `pg` treats that as `verify-full`
 * (it validates the server certificate), but pg v9 / pg-connection-string v3
 * will switch `require` to libpq semantics: encrypt, but DON'T verify the
 * cert — which is weaker and MITM-able. That change would arrive silently via
 * a dependency bump, so pin the strong behavior explicitly here.
 *
 * Done in code rather than in .env.local because DATABASE_URL comes from Neon
 * via Vercel; editing the env file would be overwritten by the next
 * `vercel env pull` and wouldn't apply in production.
 */
function resolveConnectionString() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local`.");
  }
  return url.replace(/([?&]sslmode=)require\b/, "$1verify-full");
}

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: resolveConnectionString() });
  return new PrismaClient({
    adapter,
    // Dev-only: print every SQL query to the terminal. This is your measuring
    // tape for task 5 — count the lines per button click, make a change, count
    // again. Optimising without measuring is guessing.
    log: process.env.NODE_ENV === "production" ? [] : ["query"],
  });
}

export const prisma = globalThis.prismaClient ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaClient = prisma;
}
