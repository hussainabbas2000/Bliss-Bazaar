import { getCart } from "@/client/db/cart";
import CartCard from "./CartCard";
import { executeTransaction, handleChange } from "./actions";
import { prisma } from "@/client/db/prisma";
import { getServerSession } from "next-auth";
import { authSelections } from "../api/auth/[...nextauth]/route";
import { useTransition } from "react";
import CheckoutButton from "./CheckoutButton";
export const metadata = {
    title: "My Cart - Bliss Bazaar",
};

export default async function CartPage() {
    const cart = await getCart();
    return(
        <div>
            <h1 className="mb-6 text-3xl font-extrabold">My Cart</h1>
            {cart?.items.map((cartItem)=>{
                return(
                    <CartCard key={cartItem.id} cartItem={cartItem} handleChange={handleChange}/>
                )
            })}
            {!cart?.items.length && <p>Your cart is empty!</p>}
            <div className="items-end flex flex-col sm:items-center">
                <p className="font-bold mb-3">
                    Total: ${cart?.subtotal || 0}
                </p>
                <CheckoutButton executeTransaction={executeTransaction}></CheckoutButton>
            </div>
        </div>
    )
}