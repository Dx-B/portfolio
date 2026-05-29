import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/blogs/admin(.*)"]);
const isAuthRequired = createRouteMatcher([
  "/api/blogs/:slug/comments(.*)",
  "/api/blogs/:slug/likes(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req) || isAuthRequired(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
