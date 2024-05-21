import { handleLogin } from "@/lib/supabase/auth";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const user: any = {
          id: 1,
          name: "John Doe",
          email,
        };

        if (email == "name@gmail.com" || password == "1") {
          return user;
        }

        // const login: any = await handleLogin({ email, password });
        // if (!login.status) {
        //   return null;
        // }
        // return login
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.providers === "credentials") {
        (token.email = user.email),
          (token.name = user.name),
          (token.id = user.id);
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("id" in token) {
        session.user.id = token.id;
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
