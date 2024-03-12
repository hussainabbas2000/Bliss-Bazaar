"use client";
import Link from "next/link";
import { CartIItemwithProduct } from "@/client/db/cart";
import Image from "next/image";
import { startTransition, useState, useTransition } from "react";
interface CartCardProps {
    cartItem:CartIItemwithProduct,
    handleChange: (prodID: string, quantity:number)=> Promise<void>
}

export default function CartCard({cartItem,handleChange} : CartCardProps){

    const [ispending, setTransition] = useTransition();
    const selectorArray: JSX.Element[] = [];
    for (let i =1;i<100;i++){
        selectorArray.push(
            <option key={i} value={i}>
                {i}
            </option>
        )
    }
    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image className="rounded-lg" src={cartItem.product.imgUrl} alt={cartItem.product.name} width={200} height={200}/>
            </div>
            <div>
                <Link className="font-bold" href={"/product/" + cartItem.product.id} > {cartItem.product.name}</Link>
                <div>
                    Price: ${cartItem.product.price}
                </div>


                <div className="flex gap-3 items-center my-1">
                    Quantity: 
                    <select onChange={(e)=>{
                        const selectedVal = parseInt(e.currentTarget.value);
                        setTransition(async ()=>{
                            await handleChange(cartItem.product.id,selectedVal)
                        })
                    }} defaultValue={cartItem.quantity} className="select-bordered select max-w-[80px] w-full">
                        <option value={0}>
                            0 (Remove)
                        </option>
                        {selectorArray}
                    </select>
                </div>

                <div className="gap-3 flex items-center">
                    Total: ${cartItem.product.price * cartItem.quantity}
                    {ispending && <span className="loading loading-spinner loading-md"></span>}
                </div>
                
            </div>
            <div className="divider">

            </div>
        </div>
    )
}