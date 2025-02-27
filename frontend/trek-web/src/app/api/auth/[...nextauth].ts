import NextAuth, {NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "you@example.com" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required");
              }
      
              try {
                const res = await fetch(`${process.env.DJANGO_API_URL}/login/`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                  }),
                });
      
                const user = await res.json();
      
                if (!res.ok) {
                  throw new Error(user.error || "Invalid credentials");
                }
      
                return {
                  id: user.id.toString(),
                  email: user.email,
                  name: user.name,
                  role: user.role,
                  token: user.token, // JWT token from Django
                };
              } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                  }
                  throw new Error("Something went wrong");
              }
            },
          }),
        ],
      
        // ✅ Callbacks for JWT & Session Handling
        callbacks: {
          async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
              token.id = user.id;
              token.email = user.email;
              token.name = user.name;
              token.role = user.role
              token.accessToken = user.token;
            }
            return token;
          },
          async session({ session, token }: { session: Session; token: JWT }) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.role = token.role as string;
            session.accessToken = token.accessToken as string;
            return session;
          },
        },
      
        pages: {
          signIn: "/login",
        },
      
        secret: process.env.NEXTAUTH_SECRET,
        session: {
          strategy: "jwt",
        },
      };
      
      export default NextAuth(authOptions);