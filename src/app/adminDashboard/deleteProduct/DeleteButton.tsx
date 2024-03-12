"use client"
import { Product } from "@prisma/client"




interface BProps {
    prod: Product,
    handleDelete: (prodId:string)=>Promise<void>
}

export default function DeleteButton({prod,handleDelete}:BProps){
    return(
        <button value={prod.id} onClick={async (e)=>await handleDelete(e.currentTarget.value)} className="btn btn-wide btn-square bg-red-500 ml-8">
                Delete
        </button>
    )
}