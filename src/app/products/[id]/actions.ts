"use server";
import { createCart, getCart } from "@/client/db/cart";
import { prisma } from "@/client/db/prisma";
import { revalidatePath } from "next/cache";
import { setTimeout } from "timers/promises";

export async function AddtoCartHandler(productId: string) {
  
  const cart = (await getCart()) ?? (await createCart());
  const item = cart.items.find((item) => item.prodId === productId);

  if (item) {
    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        prodId: productId,
        quantity: 1,
      },
    });
  }
  revalidatePath("../[id]");
}
