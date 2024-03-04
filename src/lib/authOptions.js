import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// Email ----------------------------------------------------------------------------
// import { Resend } from "resend";
// import SignInEmail from "@/email/SignInEmail";
// Other ----------------------------------------------------------------------------
import prisma from '@/lib/db';
import { getScreenNameFromEmail } from "@/util";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id
            session.user.email = user.email;
            session.user.emailVerified = user.emailVerified;
            session.user.screenName = user.screenName || getScreenNameFromEmail(user.email);
            session.user.image = user.image;
            session.user.name = user.name;
            session.user.role = user.role;
            return session;
        },
    },
};