import { prisma } from "@/client/db/prisma";
import { error } from "console";
import { redirect } from "next/navigation";
import Submit from "@/components/SubmitButton";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { cache } from "react";
import PageNotFound from "@/app/navErrorPage";
import Image from "next/image";


export async function editProd(formData: FormData) {
    "use server";
    const session = cookies().get("localAdminID")?.value;
    
    if(session?.length == 0){
      redirect("/admin/adminLogin");
      return;
    }
  
    const id = formData.get("id")?.toString();
    
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const price = Number(formData.get("price") || 0);
    const imgUrl = formData.get("imageUrl")?.toString();
      
    if (!name || !description || !imgUrl || !price) {
      throw Error("Required fields are missing!");
    }
    await prisma.product.update({
      where:{id: id},
      data: { 
  
          description: description,
          imgUrl : imgUrl, 
          name :name,
          price: price
      
      },
    });
    redirect("/adminDashboard");
  }
  