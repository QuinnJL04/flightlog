/**
 * Checks hashPassword / verifyPassword in src/lib/password.ts.
 *
 * Run with:  npm run test:password
 *
 * The --conditions react-server flag in that npm script is what lets a plain
 * script import a file that does `import "server-only"`. Without it, the
 * server-only package throws on purpose.
 */
import { hashPassword, verifyPassword } from "../src/lib/password";

let failed = 0;
function check(name: string, condition: boolean) {
  console.log(`${condition ? "  PASS" : "  FAIL"}  ${name}`);
  if (!condition) failed++;
}

async function main() {
  const PW = "correct horse battery staple";

  let hash: string;
  try {
    hash = await hashPassword(PW);
  } catch (error) {
    console.log("\nhashPassword threw.\n");
    console.log(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  console.log("\nhashPassword:");
  check("returns a string", typeof hash === "string");
  check("uses the scrypt$N$r$p$salt$hash format", hash.split("$").length === 6);
  check("records its parameters", hash.startsWith("scrypt$16384$8$1$"));
  check("does not contain the password", !hash.includes(PW));

  const second = await hashPassword(PW);
  check("same password twice -> different hash (salted)", hash !== second);

  console.log("\nverifyPassword:");
  check("accepts the correct password", await verifyPassword(PW, hash));
  check(
    "accepts it against the second hash too",
    await verifyPassword(PW, second),
  );
  check(
    "rejects a wrong password",
    !(await verifyPassword("wrong password", hash)),
  );
  check(
    "rejects a null hash (the seeded user must be unsignable-into)",
    !(await verifyPassword("anything", null)),
  );
  check(
    "rejects an empty stored hash",
    !(await verifyPassword("anything", "")),
  );
  check("rejects garbage", !(await verifyPassword("anything", "not-a-hash")));
  check(
    "rejects a truncated hash",
    !(await verifyPassword("anything", "scrypt$16384$8$1$abc")),
  );
  check(
    "rejects a tampered hash",
    !(await verifyPassword(PW, hash.slice(0, -4) + "AAAA")),
  );

  console.log(
    failed === 0
      ? "\nAll password checks pass.\n"
      : `\n${failed} check(s) failed.\n`,
  );
  process.exit(failed === 0 ? 0 : 1);
}

main();
