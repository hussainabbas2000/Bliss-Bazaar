"use server";

import { createCart, getCart } from "@/client/db/cart";
import { prisma } from "@/client/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleDelete(prodId:string) {
    await prisma.product.delete({where:{id:prodId}});
    revalidatePath("/adminDashboard/deleteProduct"); 
}