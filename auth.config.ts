import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname === '/';
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // Check if the user is on the login page
      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl))
        }
        return true;
      }

      // Check if the user is on the dashboard page
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;