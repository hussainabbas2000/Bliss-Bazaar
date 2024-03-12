"use client";
import { ShoppingCart } from "@/client/db/cart";
import Link from "next/link";

interface ButtonProps {
  cart: ShoppingCart | null;
}
export default function CartButton({ cart }: ButtonProps) {
  function closeDropDown() {
    const element = document.activeElement as HTMLElement;
    if (element) {
      element.blur();
    }
  }
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle ">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="indicator-item badge-sm badge">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        className="bg-base-100 z-30 shadow dropdown-content w-56 card mt-3 card-compact"
        tabIndex={0}
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} Items</span>
          <span className="text-info">Subtotal: ${cart?.subtotal || 0}</span>
          <div className="card-actions">
            <Link
              onClick={closeDropDown}
              className="btn btn-primary btn-block"
              href="/cart"
            >
              Go To Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
