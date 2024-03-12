"use client";

import { useState, useTransition } from "react";

interface ButtonProps {
  prodId: string;
  incProd: (prodId: string) => Promise<void>;
}
export default function AddButton({ prodId, incProd }: ButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [flag, setFlag] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setFlag(false);
          startTransition(async () => {
            await incProd(prodId);
            setFlag(true);
          });
        }}
        className="btn btn-primary"
      >
        Add To Cart
        <div className="object-fill">
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
        </div>
      </button>
      {isPending && <span className="loading loading-spinner loading-md"></span>}
      {flag && !isPending && <span className="text-success">Added!</span>}
    </div>
  );
}
