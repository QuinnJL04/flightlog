import { SignIn } from "@clerk/nextjs";

// The folder name [[...sign-in]] is an "optional catch-all" route: it matches
// /sign-in and also /sign-in/factor-two, /sign-in/sso-callback, etc. Clerk's
// component drives those sub-steps itself, so it needs all of them.
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
