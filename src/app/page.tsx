import { prisma } from "@/client/db/prisma";
import Pagination from "@/components/Pagination";
import ProdCard from "@/components/ProdCard";
import { cp } from "fs";
import Image from "next/image";
import Link from "next/link";
export default async function Home({searchParams:{page = "1"}}:PageProps) {
  const cPage = parseInt(page);
  const pageSize = 5;
  const heroItemCount = 1;
  const totalItems = await prisma.product.count();
  const totalPages = Math.ceil((totalItems - heroItemCount) / pageSize);
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (cPage - 1) * pageSize + (cPage === 1? 0:heroItemCount),
    take: pageSize+(cPage === 1? heroItemCount:0)
  });


  return (
    <div className="items-center flex flex-col ">
      {cPage === 1 &&
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[0].imgUrl}
            alt={products[0].name}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            height={800}
            width={400}
          />
          <div>
            <h1 className="text-3xl font-bold">{products[0].name} <span className="badge rounded-badge badge-accent badge-md items-end">
            New
          </span></h1>
            <p className="py-6">{products[0].description}</p>
            <Link
              className="btn btn-primary"
              href={"/products/" + products[0].id}
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
      }
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product) => {
          return <ProdCard key={product.id} product={product}></ProdCard>;
        })}
      </div>
      {totalPages>1 && 
      <Pagination cPage={cPage} tPages={totalPages}></Pagination>
      }
    </div>
  );
}
interface PageProps {
  searchParams: {page: string}
}
