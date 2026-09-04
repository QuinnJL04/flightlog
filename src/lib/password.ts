import "server-only";

import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  type ScryptOptions,
} from "node:crypto";
import { promisify } from "node:util";

// promisify() resolves to scrypt's 3-argument overload, which drops the options
// parameter we need for the cost settings. This cast names the 4-arg shape.
const scrypt = promisify(scryptCallback) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  options: ScryptOptions,
) => Promise<Buffer>;

// scrypt is deliberately slow and memory-hard — that IS the feature. N is the
// work factor; doubling it doubles time and memory. Raising it later won't
// break old hashes, because the parameters travel inside each stored hash
// rather than being read from here at verify time.
const N = 16384;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/**
 * Hash a password for storage, as a single self-describing string:
 *
 *   scrypt$16384$8$1$<salt-base64>$<hash-base64>
 *
 * The salt is random per user and is not secret — it is stored right there in
 * the string. It only has to be different every time, so that two users who
 * pick the same password do not end up with the same hash.
 *
 * Not implemented yet.
 */
export async function hashPassword(password: string): Promise<string> {
  void password;
  void scrypt;
  void randomBytes;
  void KEY_LENGTH;
  void SALT_LENGTH;
  throw new Error("hashPassword not implemented.");
}

/**
 * Check a password against a stored hash.
 *
 * A null or malformed hash always returns false. In particular a null hash is
 * the seeded account, which must be impossible to sign into — it means "cannot
 * sign in", never "any password works".
 *
 * The cost parameters are read from the stored string rather than from the
 * constants above, so hashes written under older parameters still verify.
 * Comparison is constant-time: how long `===` takes leaks how many leading
 * bytes matched, which is enough to recover a hash a byte at a time.
 *
 * Not implemented yet.
 */
export async function verifyPassword(
  password: string,
  stored: string | null,
): Promise<boolean> {
  void password;
  void stored;
  void timingSafeEqual;
  void N;
  void R;
  void P;
  return false;
}
