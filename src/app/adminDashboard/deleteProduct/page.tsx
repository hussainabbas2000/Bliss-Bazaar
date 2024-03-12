import { prisma } from "@/client/db/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProdCard from "@/components/ProdCard";
import { handleDelete } from "./actions";
import DeleteButton from "./DeleteButton";



export default async function DeleteProduct(){
    const session = cookies().get("localAdminID")?.value;
  if(session==""){
    redirect("/admin/adminLogin");
  }
  const products = await prisma.product.findMany();
    return(
        <div>
            {products.map((prod)=>{
                return(
                    <div key={prod.id} className="items-center">
                        <div  className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-center">
                             <ProdCard product={prod}></ProdCard> 
                         </div>
                       <DeleteButton prod={prod} handleDelete = {handleDelete}></DeleteButton>
                    </div>
                )
            })}
        </div>
    )
}