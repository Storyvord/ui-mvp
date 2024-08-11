// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/", "/auth/sign-in", "/auth/sign-up"];
  const restrictedCrewPaths = ["/crew", "/crew/home", "/crew/:path*"]; // Add all restricted paths for crew here
  const restrictedClientPaths = ["/dashboard", "/dashboard/home", "/dashboard/:path*"]; // Add all restricted paths for clients here

  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("accessToken");
  const isClient = request.cookies.get("isClient")?.value;
  
  console.log(isClient);

  if (isPublicPath && token && isClient === "true") {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  if (isPublicPath && token && isClient === "false") {
    return NextResponse.redirect(new URL("/crew/home", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Prevent clients from accessing crew sections
  const isRestrictedCrewPath = restrictedCrewPaths.some((crewPath) =>
    path.startsWith(crewPath)
  );

  if (isRestrictedCrewPath && isClient === "true") {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  // Prevent crew from accessing client sections
  const isRestrictedClientPath = restrictedClientPaths.some((clientPath) =>
    path.startsWith(clientPath)
  );

  if (isRestrictedClientPath && isClient === "false") {
    return NextResponse.redirect(new URL("/crew/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/crew/:path*", "/project-details/:path*"],
};
