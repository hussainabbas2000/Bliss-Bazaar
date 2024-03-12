import { prisma } from "@/client/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { env } from "@/client/env";
import { combineCarts } from "@/client/db/cart";
export const authSelections: NextAuthOptions ={
    adapter: PrismaAdapter(prisma) as Adapter,
    providers:[
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        session({session, user}) {
            session.user.id = user.id;
            return session;
        },
    },
    events : {
        async signIn(message){
            await combineCarts( message.user.id);
        }
    }
}
const handler = NextAuth(authSelections)
export {handler as GET, handler as POST}