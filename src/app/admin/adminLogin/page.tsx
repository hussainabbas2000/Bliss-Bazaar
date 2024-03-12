import { prisma } from "@/client/db/prisma";
import { redirect } from "next/navigation";
import Submit from "@/components/SubmitButton";
import { cookies } from "next/headers";
import { useState } from "react";
export const metadata = {
  title: "Admin Login - Bliss Bazaar",
};

async function login(formData: FormData) {
  "use server";
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    throw new Error("Required fields are missing!");
  }

  const admin = await prisma.admin.findUnique({
    where: {email:email}
  })
  if(!admin){
    throw new Error("Email or Password Incorrect!");
  }
  if(admin.password !== password){
    throw new Error("Email or Password Incorrect!");
  }
  cookies().set("localAdminID", email);
  redirect("/adminDashboard");
}
export default async function LoginPage() {

  return (
    <div className="hero p-96 items-center">
      
      <form action={login}>
      <h1 className="hero-content text-lg mb-4 font-bold">Admin Login</h1>
        <input
          name="email"
          required
          type="email"
          placeholder="Email Address"
          className="input input-bordered mb-4 w-full"
        />
        <input
          name="password"
          placeholder="Admin Password"
          required
          className="input input-bordered mb-4 w-full"
          type="password"
        />
        <Submit className="btn-block">
          Login
        </Submit>
      </form>
    </div>
  );
}
