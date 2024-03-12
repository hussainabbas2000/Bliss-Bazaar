"use server";

import { cookies } from "next/headers";
export async function handleChangeSignOut() {
    cookies().set("localAdminID","");
}