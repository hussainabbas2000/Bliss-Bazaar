"use client"

import { CartwithProduct } from "@/client/db/cart";
import { Cart } from "@prisma/client";
import { useTransition } from "react";

interface CheckoutProps {
    executeTransaction: ()=> Promise<void>
}
export default function CheckoutButton({executeTransaction}: CheckoutProps){
    const [ispending, setTransition] = useTransition();
    return(
        <div className="gap-3 flex items-center">
        <button onClick={(e)=>{
            setTransition(async ()=>{
                await executeTransaction();
            })
            }}
             className="sm:w-[200px] btn btn-primary">
            Checkout
        </button>
        {ispending && <span className="loading loading-spinner loading-md"></span>}

        </div>
    )
};