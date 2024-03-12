import PageNotFound from "@/app/navErrorPage";
import { prisma } from "@/client/db/prisma";
import { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import AddButton from "./AddToCart";
import { AddtoCartHandler } from "./actions";
interface ProductProps {
  params: {
    id: string;
  };
}

export default async function ProdPage({ params: { id } }: ProductProps) {
  const product = await getData(id);
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        priority
        className="rounded-lg"
        src={product?.imgUrl || ""}
        alt={product?.name || ""}
        height={500}
        width={500}
      />

      <div>
        <h1 className="text-5xl font-bold">{product?.name}</h1>
        <div className="badge mt-4">
          <label>${product?.price}</label>
        </div>
        <p>{product?.description}</p>
        <AddButton prodId={product?.id || ""} incProd={AddtoCartHandler}></AddButton>
      </div>
        
    </div>
  );
}
const getData = cache(async (id:string) => {
    const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    PageNotFound();
  }
  return product
});
export async function generateMetadata({params:{id}} :ProductProps) : Promise<Metadata> {
    const product = await getData(id);
    return {
        title: product?.name + "- Bliss Bazaar",
        description: product?.description,
        openGraph: {
            images: [{url: product?.imgUrl || ""}],
        }
    };
}

