import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher([
    '/',
    '/about',
    '/sign-up',
    '/sign-in',
]);

const isPublicApiRoute = createRouteMatcher([
    '/api/videos'
]);

export default clerkMiddleware( async (auth,req) => {
    const { userId } = await auth();
    const currentPath = new URL(req.url);
    const isAccessingDashboard = currentPath.pathname === "/home";
    const isApiRequest = currentPath.pathname.startsWith("/api");
    
    if (userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL("/home", req.url));
    }
   
    if (!userId) {
        // If user is not logged in and trying to access a protected route
        if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        // If the request is for a protected API and the user is not logged in
        if (isApiRequest && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }
    }
    return NextResponse.next();
});



export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}