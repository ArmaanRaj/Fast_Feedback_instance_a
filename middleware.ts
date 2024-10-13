import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  '/personal_area', 
  '/area_page/(.*)', 
])

export const config = {
  matcher: [
    // Apply middleware to all routes except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

export default clerkMiddleware((auth, request) => {
  if(protectedRoutes(request)){
    auth().protect();
  }
})
