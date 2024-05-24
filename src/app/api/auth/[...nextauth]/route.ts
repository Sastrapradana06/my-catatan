import { handleLogin } from "@/lib/supabase/auth";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "klimsik123",
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { name: "email", type: "text" },
        password: { name: "password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const login: any = await handleLogin({ email, password });
        if (!login.status) {
          return null;
        } else {
          const user = {
            id: login.user.id,
            name: login.user.username,
            email: login.user.email,
          };
          cookies().set("user", JSON.stringify(user));
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.providers === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
        token.sub = user.id;
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("sub" in token) {
        session.user.id = token.sub;
      }

      if ("name" in token) {
        session.user.name = token.name;
      }

      return session;
    },
  },

  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
