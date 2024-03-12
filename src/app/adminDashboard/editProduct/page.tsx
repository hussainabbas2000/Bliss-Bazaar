import { prisma } from "@/client/db/prisma"
import ProdCard2 from "@/components/prodCard2";
import Link from "next/link";




export default async function EditPage(){
    const products = await prisma.product.findMany();

    return(
        <div>
            <h1 className="text-3xl font-bold">Edit Products</h1>
            {products.map((item)=>{
                return(
                    <div key={item.id} className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    
                        <ProdCard2 product={item}></ProdCard2>
                    
                    </div>
                )
                
            })}
        </div>
    )
}