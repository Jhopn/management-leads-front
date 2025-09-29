import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface CustomJWTPayload {
  id: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    roles: string[];
    accessToken: string;
    exp: number;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      email: string;
      roles: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    roles: string[];
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            return null;
          }

          const json = await res.json();
          const decodedToken = jwtDecode<CustomJWTPayload>(json.token);
          
          const user = {
            id: decodedToken.id,
            email: decodedToken.email,
            roles: decodedToken.roles,
            accessToken: json.token,
          };

          return user;

        } catch (error) {
          console.log("Erro CRÍTICO no authorize:", error);
          return null;
        }
      },
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.roles = token.roles;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };