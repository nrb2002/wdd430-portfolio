// auth.config.ts

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Protect all dashboard routes
      const isProtected =
        nextUrl.pathname.startsWith("/dashboard");

      if (isProtected) {
        if (isLoggedIn) return true;

        // Redirects to /login automatically
        return false;
      }

      // Prevent logged-in users from visiting /login
      if (
        isLoggedIn &&
        nextUrl.pathname === "/login"
      ) {
        return Response.redirect(
          new URL("/dashboard", nextUrl)
        );
      }

      return true;
    },
  },

  // Providers are configured in auth.ts
  providers: [],
} satisfies NextAuthConfig;