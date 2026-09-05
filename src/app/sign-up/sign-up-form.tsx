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
 * Markup only. The <form> has no action yet — 1B.6 adds useActionState and
 * wires it to signUp.
 */
export function SignUpForm() {
  void signUp;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm uppercase tracking-widest text-zinc-400">
        Sign Up
      </h2>

      <p aria-live="polite" className="min-h-5 text-sm text-red-400" />

      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-wider text-zinc-500"
          >
            Name (optional)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="user"
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-wider text-zinc-500"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="block text-xs uppercase tracking-wider text-zinc-500"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600"
          />
        </div>

        <button
          type="submit"
          className="mt-1 rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 disabled:opacity-50"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}
