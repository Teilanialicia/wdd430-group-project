import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Only let the user see the home page and login screen before logging in
      const isOnHomePage = nextUrl.pathname === "/";
      const isOnLoginPage = nextUrl.pathname === "/login";

      if (isOnHomePage || isOnLoginPage) {
        return true;
      }

      return Response.redirect(new URL('/login', nextUrl));
    },
  },
  providers: [],
} satisfies NextAuthConfig;