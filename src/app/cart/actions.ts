"use server";

import { createCart, getCart } from "@/client/db/cart";
import { prisma } from "@/client/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authSelections } from "../api/auth/[...nextauth]/route";
import { cookies } from "next/headers";

export async function handleChange(prodId: string, quantity:number) {
    const cart = (await getCart())??(await createCart());
    const item = cart.items.find((item)=>item.prodId === prodId);
    if (quantity === 0){
        if(item){
            await prisma.cartItem.delete({where: {id: item.id}})
        }
    } 
    else{
        if(item){
            await prisma.cartItem.update({where: {id:item.id}, data:{quantity}})
        }
        else{
            await prisma.cartItem.create({data:{cartId:cart.id,prodId,quantity}})
        }
    }
    revalidatePath("/cart"); 
}
export async function executeTransaction() {
    const cart = (await getCart())??(await createCart());
    if(cart.items.length === 0){
        return;
    }
    let itemArr:string[] = [];
    cart.items.map((item)=>{
        itemArr.push(item.id);
    })
    const userId = cart.userId || (cookies().get("localUserId")?.value);
    if(userId){
    await prisma.transaction.create({
        data:{
            userId,
            cartId:cart.id,
            total: cart.subtotal,
            items: itemArr,
        }
    })
    }
    await prisma.cart.delete({where:{id:cart.id}});
    cookies().set("localCartId","");
    revalidatePath("/"); 
}