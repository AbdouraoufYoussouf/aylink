import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from "./lib/db";
import { getUserById } from "./actions/user-action";
import { ExtendedUser } from "./next-auth";
import { authConfig } from "./auth.config"

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/',
    error: '/error',
  },
  session: { strategy: "jwt" },

  callbacks: {
    // async signIn({user, account }) {
    //   try {
    //     if (account?.provider !== 'credentials') return true;
    //     const {data} = await getUserById(user?.id as string)
    //     // console.log({ user, account })
    //     if (!data?.emailVerified) {
    //       return false;
    //     }
    
    //     return true;
    //   } catch (error) {
    //     console.error("Error in signIn function:", error);
    //     return false;
    //   }
    // },

    async jwt({ token }) {
      if (token.sub && !token.user) {
        const { data: userData } = await getUserById(token.sub);
        if (userData) {
          token.user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            pseudo: userData.pseudo,
            emailVerified: userData.emailVerified,
            image: userData.image,
          } as ExtendedUser;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.sub && token.user) {
        session.user = {
          ...session.user,
          ...token.user,
          id: token.sub,
          email: token.user.email,
          pseudo: token.user.pseudo,
          image: token.picture,
          emailVerified: token.user.emailVerified
        } as ExtendedUser & DefaultSession["user"];
      }

      return session;
    },
  }
});

