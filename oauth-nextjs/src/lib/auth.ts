import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure the Prisma adapter (optional - for user persistence)
  // Uncomment the following lines if you want to use Prisma for user persistence
  // import { PrismaAdapter } from "@auth/prisma-adapter";
  // import { PrismaClient } from "@prisma/client";
  // const prisma = new PrismaClient();
  // adapter: PrismaAdapter(prisma),

  // Configure providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // Configure callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow sign in
      console.log("Sign in attempt:", { user, account, profile });
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async session({ session, user, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = user?.id || token?.sub || "";
        session.user.role = user?.role || "user";
      }
      return session;
    },

    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },

  // Configure pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  // Configure session
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Configure JWT
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",

  // Configure events
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("User signed in:", { user, account, profile, isNewUser });
    },
    async signOut({ session, token }) {
      console.log("User signed out:", { session, token });
    },
  },
};
