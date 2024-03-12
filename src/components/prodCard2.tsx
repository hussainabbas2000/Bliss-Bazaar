import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
interface ProdCardProps {
  product: Product;
}
const ProdCard2 = ({ product }: ProdCardProps) => {
  return (
    <div>
    <Link
      className="card transition-shadow w-full bg-base-100 hover:shadow-2xl"
      href={"/adminDashboard/prod/edit/" + product.id}
    >
      <figure>
        <Image
          className="object-cover h-48"
          height={400}
          width={800}
          alt={product.name}
          src={product.imgUrl}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <label className="badge">${Number(product.price) / 100}</label>
      </div>
    </Link>
    </div>
  );
};
export default ProdCard2;
