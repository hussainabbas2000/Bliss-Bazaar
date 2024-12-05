import { prisma } from "@/client/db/prisma"
import Submit from "@/components/SubmitButton";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function editProf(formData: FormData){
    "use server";
    
    const prevEmail = cookies().get("localAdminID")?.value;
    if(!prevEmail){
        throw new Error("Missing cookies.")
    }
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    const res = await prisma.admin.update({
        where:{email: prevEmail},
        data:{
            email:email,
            password:password,
            name:name
        }
    })
    if(res){
        cookies().set("localAdminID",`${email}`);
        redirect("/adminDashboard");
    }
    
}