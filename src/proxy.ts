import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed the "middleware" file convention to "proxy". Identical
// behavior, new name.
//
// Note what is NOT here anymore. This used to call createRouteMatcher() and
// auth.protect() to guard /dashboard. Clerk Core 3 deprecated that: path
// matching in the proxy can diverge from how Next.js actually routes a
// request, which leaves protected data reachable. Auth checks now live next
// to the data they guard — see dashboard/page.tsx and dashboard/actions.ts.
//
// clerkMiddleware() itself is still required: it populates the auth context
// that auth() and auth.protect() read further down the request.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
