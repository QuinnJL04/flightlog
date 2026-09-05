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
 * Markup only. The <form> has no action yet — 1B.6 adds useActionState and
 * wires it to signIn.
 */
export function SignInForm() {
  void signIn;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm uppercase tracking-widest text-zinc-400">
        Sign in
      </h2>

      {/*
        Error slot. Empty until 1B.6 fills it from useActionState. It stays in
        the DOM rather than being conditionally rendered, because a screen
        reader only announces text that appears inside a live region that was
        already there. min-h-5 reserves the line so the form doesn't jump when
        an error shows up.
      */}
      <p aria-live="polite" className="min-h-5 text-sm text-red-400" />

      <form className="flex flex-col gap-3">
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
            autoComplete="current-password"
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600"
          />
        </div>

        <button
          type="submit"
          className="mt-1 rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 disabled:opacity-50"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
}
