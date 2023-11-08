import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@polui.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      authorize: async (credentials, req) => {
        const creds = {
          email: credentials?.email,
          password: credentials?.password,
        };

        if (!creds.email || !creds.password)
          throw new Error("No credentials provided");

        const userFound = await db.user.findUnique({
          where: {
            email: creds.email,
          },
        });

        if (!userFound) {
          throw new Error("User not found");
        }

        const matchPassword = await bcrypt.compare(
          creds.password,
          userFound.password
        );

        if (!matchPassword) {
          throw new Error("Password is incorrect");
        }

        const entireUser: {
          id: string;
          name: string;
          email: string;
          image: string | null;
        } = {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
          image: userFound.avatar,
        };
        return entireUser;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }: any) => {
      const user: any = {
        id: token.id as number,
        name: token.name as string,
        email: token.email as string,
        image: token.image as string,
      };

      const sessionObj = { ...session, user };
      return sessionObj;
    },
    jwt: ({ token, user }: any) => {
      if (user) {
        const u = user as unknown as {
          id: number;
          name: string;
          email: string;
          image: string;
        };
        return {
          name: u.name,
          id: u.id,
          email: u.email,
          image: u.image,
        };
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
