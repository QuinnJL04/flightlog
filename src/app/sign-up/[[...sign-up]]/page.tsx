import { SignUp } from "@clerk/nextjs";

// This is your "create an account" form. Clerk renders the fields, email
// verification, and password rules; we just place it on the page.
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
