import { authMiddleware } from '@clerk/nextjs';

// Protect all routes including /dashboard
export default authMiddleware({
  publicRoutes: ["/", "/login", "/register", "/reset-password"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};