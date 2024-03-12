import { prisma } from "@/client/db/prisma"
import Submit from "@/components/SubmitButton";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";


async function editProf(formData: FormData){
    "use server";
    const prevEmail = cookies().get("localAdminID")?.value;
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    


    await prisma.admin.update({
        where:{email: prevEmail},
        data:{
            email:email,
            password:password,
            name:name
        }
    })
    cookies().set("localAdminID",`${email}`);
    redirect("/adminDashboard")
}



export default async function EditProfilePage(){
    const session = cookies().get("localAdminID")?.value;
    if(session==""){
        redirect("/admin/adminLogin");
    }
   
    const admin = await prisma.admin.findUnique({
        where:{email:session}
    })

    
    
    return(
        <div>
      <h1 className="text-lg mb-4 font-bold gap-3">Edit Profile</h1>
      <form className="form-control" action={editProf}>
        
        <div className="flex flex-row gap-3 font-bold">
            <label>Name:</label>
            <input
            name="name"
            placeholder={`${admin?.name}`}
            required
            className="input input-bordered mb-4 w-full"
            />
        </div>
        <div className="flex flex-row gap-3 font-bold">
            <label>Email:</label>
        <input
          name="email"
          type="email"
          required
          placeholder={`${admin?.email}`}
          className="input input-bordered mb-4 w-full"
        />
        </div>
        <div className="flex flex-row gap-3 font-bold">
            <label>Password:</label>
        <input
          name="password"
          required
          type="password"
          placeholder={"**************"}
          className="input input-bordered mb-4 w-full"
        />
        </div>
        
        <Submit className="btn-block">
          Edit Profile
        </Submit>
      </form>
    </div>
    )
}