// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/api/api";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/", "/auth/sign-in", "/auth/sign-up"];
  const restrictedCrewPaths = ["/crew", "/crew/home"];
  const restrictedClientPaths = ["/dashboard", "/dashboard/home", "/project-details"];

  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("accessToken");
  const verifiedToken = await verifyToken(token);

  const isClient = request.cookies.get("isClient")?.value;

  if (isPublicPath && verifiedToken && isClient === "true") {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  if (isPublicPath && verifiedToken && isClient === "false") {
    return NextResponse.redirect(new URL("/crew/home", request.url));
  }

  if (!isPublicPath && !verifiedToken) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Prevent clients from accessing crew sections
  const isRestrictedCrewPath = restrictedCrewPaths.some((crewPath) => path.startsWith(crewPath));

  if (isRestrictedCrewPath && isClient === "true") {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  // Prevent crew from accessing client sections including project-details
  const isRestrictedClientPath = restrictedClientPaths.some((clientPath) => {
    if (clientPath === "/project-details") {
      return path.startsWith(clientPath); // Handles dynamic segments
    }
    return path.startsWith(clientPath);
  });

  if (isRestrictedClientPath && isClient === "false") {
    return NextResponse.redirect(new URL("/crew/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/crew/:path*", "/project-details/:path*"],
};
