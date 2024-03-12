import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authSelections } from "@/app/api/auth/[...nextauth]/route";
import { it } from "node:test";

export async function createCart():Promise<ShoppingCart> {
    const session = await getServerSession(authSelections);
    let cart : Cart;
    if(session){
        cart = await prisma.cart.create({data:{userId: session.user.id}});
    }
    else{
        cart = await prisma.cart.create({ data: {} });
        cookies().set("localCartId",cart.id);
        cookies().set("localUserId",cart.id);
    }
   
  
  return {
    ...cart,
    items:[],
    size: 0,
    subtotal: 0
  }
}
export async function getCart():Promise<ShoppingCart|null> {
    const session = await getServerSession(authSelections);
    let cart: CartwithProduct | null = null;
    if(session){
        cart = await prisma.cart.findFirst({where: {userId: session.user.id}, include:{items:{
            include:{product:true}
        }}});
    }else{
        const lId = cookies().get("localCartId")?.value
        cart = lId? await prisma.cart.findUnique({where:{id:lId}, include:{items:{include:{product:true}}}}):null;
    }

    if(cart){
        return {
            ...cart,
            size:cart.items.reduce((val,item)=>val + item.quantity,0),
            subtotal: cart.items.reduce((val,item)=> val +item.quantity*item.product.price,0),
            
        }
    }
    return null;
}
export type ShoppingCart = CartwithProduct & {
    size:number,
    subtotal:number,
}
export type CartwithProduct = Prisma.CartGetPayload<{
    include:{items:{include:{product:true}}},
}>
export type CartIItemwithProduct = Prisma.CartItemGetPayload<{
    include: {product:true}
}>
export async function combineCarts(userId:string) {
    const lId = cookies().get("localCartId")?.value
    const cart = lId? await prisma.cart.findUnique({where:{id:lId}, include:{items: true}}):null;
    if(cart){
        const cart1 = await prisma.cart.findFirst({where: {userId}, include:{items:true}});
        await prisma.$transaction(async tx => {
            if(cart1){
                const mergedList = mergeLocalandCloudCarts(cart.items, cart1.items);
                await tx.cartItem.deleteMany({where:{cartId:cart1.id}});
                await tx.cartItem.createMany({data:mergedList.map((item)=>({
                    cartId:cart1.id,
                    prodId: item.prodId,
                    quantity: item.quantity
                }))})
            }
            else{
                await tx.cart.create({data:{userId, items:{createMany:{data:cart.items.map(item=>
                    ({
                        prodId: item.prodId,
                        quantity: item.quantity
                    })
                    )}}}})
            }
            await tx.cart.delete({where:{id:cart.id}})
            cookies().set("localCartId","");
        })
    }
    return;
}

function mergeLocalandCloudCarts(...items:CartItem[][]){
    return items.reduce((acc , itemlist) => {
        itemlist.forEach((item)=>{
            const eItem = acc.find((it)=>{it.prodId === item.prodId});
            if(!eItem){
                acc.push(item)
            }
            else{
                eItem.quantity += item.quantity;
            }
        });
        return acc;
    }, [] as CartItem[]);
}