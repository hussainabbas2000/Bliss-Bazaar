"use server";

import { createCart, getCart } from "@/client/db/cart";
import { prisma } from "@/client/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { error } from "node:console";

export async function handleChange(prodId: string, quantity:number) {
    const cart = (await getCart())??(await createCart());

//Will revert it to original functionality to kill the mutant
    const item = cart.items.find((item)=>item.prodId !== prodId); ////Mutant number1: replaced (item.prodId === prodId)
// The next three lines are introduced to kill mutant1
    if (quantity<0){
        throw new Error("Invalid value");
    }

    if (quantity === 0){ //Mutant number1: replaced (quantity ===0)
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