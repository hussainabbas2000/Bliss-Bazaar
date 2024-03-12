import { prisma } from "@/client/db/prisma";
import { error } from "console";
import { redirect } from "next/navigation";
import Submit from "@/components/SubmitButton";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { cache } from "react";
import PageNotFound from "@/app/navErrorPage";
import Image from "next/image";
export const metadata = {
  title: "Add Product - Bliss Bazaar",
};

async function editProd(formData: FormData) {
  "use server";
  const session = cookies().get("localAdminID")?.value;
  if(session ==""){
    redirect("/admin/adminLogin");
  }

  const id = formData.get("id")?.toString();
  console.log(id)
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const imgUrl = formData.get("imageUrl")?.toString();
    console.log(id)
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

interface ProductProps {
    params: {
      id: string;
    };
  }

export default async function EditProductPage({params: { id }}: ProductProps) {



  const session = cookies().get("localAdminID")?.value;
  if(session==""){
    redirect("/admin/adminLogin");
  }




  const product = await getData(id);



  return (
    <div>
      <h1 className="text-lg mb-4 font-bold gap-3">Edit Product</h1>
      <form className="form-control" action={editProd}>
      <Image
        priority
        className="rounded-lg items-center gap-3"
        src={product?.imgUrl || ""}
        alt={product?.name || ""}
        height={500}
        width={500}
      />

        <div className="flex flex-row gap-3 font-bold">
            <label>ID:</label>
            <input className="input input-bordered mb-4 w-full" name="id" value={`${product?.id}`} required readOnly></input>
        </div>
        <div className="flex flex-row gap-3 font-bold">
            <label>Name:</label>
        <input
          name="name"
          placeholder={`${product?.name}`}
          required
          className="input input-bordered mb-4 w-full"
        />
        </div>
        <div className="flex flex-row gap-3 font-bold">
            <label>Description:</label>
        <textarea
          name="description"
          required
          placeholder={`${product?.description}`}
          className="textarea textarea-bordered mb-4 w-full"
        />
        </div>
        <div className="flex flex-row gap-3 font-bold">
            <label>Price:</label>
        <input
          name="price"
          required
          type="number"
          placeholder={`$${product?.price}`}
          className="input input-bordered mb-4 w-full"
        />
        </div>
        <div className="flex flex-row gap-3 font-bold">
            <label>IMG URL:</label>
        <input
          name="imageUrl"
          placeholder={`${product?.imgUrl}`}
          required
          className="input input-bordered mb-4 w-full"
          type="url"
        />
        </div>
        <Submit className="btn-block">
          Edit Product
        </Submit>
      </form>
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
