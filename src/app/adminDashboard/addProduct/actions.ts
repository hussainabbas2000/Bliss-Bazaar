import { prisma } from "@/client/db/prisma";
import { error } from "console";
import { redirect } from "next/navigation";
import Submit from "@/components/SubmitButton";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function addProd(formData: FormData) {
    "use server";
    const session = cookies().get("localAdminID")?.value;
    if(!session){
      redirect("/admin/adminLogin");
      return;
    }
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const price = Number(formData.get("price") || 0); 
    //const price = Number(formData.get("price") ||  0 - 1); // Mutant1: changed 0 to(0 - 1)
    
    const imgUrl = formData.get("imageUrl")?.toString();
  
    if (!name || !description || !imgUrl || !price) { // Mutant2: removed !price check
      throw new Error("Required fields are missing!");
    }
    await prisma.product.create({
      data: { description, imgUrl, name, price },
    });
    redirect("/adminDashboard");
  }