import { prisma } from "@/client/db/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "@/client/env";
import { combineCarts } from "@/client/db/cart";

// Create NextAuth handler with the options directly

import { authOptions } from "../authConfig"; // Import from the new config file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
