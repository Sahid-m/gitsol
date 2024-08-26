import db from "@/db";
import { Keypair } from "@solana/web3.js";
import { Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

interface ext_session extends Session {
  user: {
    email: string;
    name: string;
    image: string;
    uid: string;
    sub: string;
  };
}

export const authConfig = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }: any): ext_session => {
      const newSession: ext_session = session as ext_session;
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid;
        newSession.user.sub = token.sub;
      }

      return newSession;
    },
    async jwt({ token, account, profile }: any) {
      const user = await db.user.findFirst({
        where: {
          sub: token.sub,
        },
      });

      if (user) {
        token.uid = user.id;
      }

      return token;
    },

    async signIn({ user, account, profile, email, credentials }: any) {
      const userEmail = user.email;

      if (!userEmail) return false;

      const userDb = await db.user.findFirst({
        where: {
          username: userEmail,
        },
      });

      if (userDb) return true;

      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toBase58();
      const privateKey = keypair.secretKey.toString();

      await db.user.create({
        data: {
          username: userEmail,
          sub: account.providerAccountId ?? "",
          name: user.name,
          profileImg: user.image,
          solWallet: {
            create: {
              publicKey: publicKey,
              privateKey: privateKey,
            },
          },
        },
      });

      return true;
    },
  },
};
