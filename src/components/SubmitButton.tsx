"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
type SubmitProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;
export default function Submit({ children, className, ...props }: SubmitProps) {
  const {pending} = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`btn btn-primary ${className}`}
      {...props}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
