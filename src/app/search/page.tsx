import { prisma } from "@/client/db/prisma"
import ProdCard from "@/components/ProdCard"
import { Metadata } from "next"

export default async function Search({searchParams:{query}}:SearchProps){
    const prods = await prisma.product.findMany({
        where:{OR:[{name:{contains:query,mode:"insensitive"}},{description:{contains:query,mode:"insensitive"}}]},
        orderBy: {id:"desc"}
    })
    if(prods.length === 0){
        return  <div className="text-center">No Matching Products</div>
    }
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {
                prods.map((prod)=>{
                    return(
                        <ProdCard key={prod.id} product={prod}></ProdCard>
                    )
                })
            }
        </div>
    )
};
interface SearchProps{
    searchParams:{query:string}
};
export function generateMetadata({searchParams:{query}}:SearchProps): Metadata{
    return{
        title:`Search: ${query} - Bliss Bazaar`
    }
}