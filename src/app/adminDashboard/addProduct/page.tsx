import { prisma } from "@/client/db/prisma";
import { error } from "console";
import { redirect } from "next/navigation";
import Submit from "@/components/SubmitButton";
import { getServerSession } from "next-auth";
import { authSelections } from "../../api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
export const metadata = {
  title: "Add Product - Bliss Bazaar",
};

export async function addProd(formData: FormData) {
  "use server";
  const session = cookies().get("localAdminID")?.value;
  if(!session){
    redirect("/admin/adminLogin");
    return;
  }
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const imgUrl = formData.get("imageUrl")?.toString();

  if (!name || !description || !imgUrl || !price) {
    throw new Error("Required fields are missing!");
  }
  await prisma.product.create({
    data: { description, imgUrl, name, price },
  });
  redirect("/adminDashboard");
}
export default async function AddProductPage() {
  const session = cookies().get("localAdminID")?.value;
  if(session==""){
    redirect("/admin/adminLogin");
  }
  return (
    <div>
      <h1 className="text-lg mb-4 font-bold">Add Product</h1>
      <form action={addProd}>
        <input
          name="name"
          placeholder="Name"
          required
          className="input input-bordered mb-4 w-full"
        />
        <textarea
          name="description"
          required
          placeholder="Description"
          className="textarea textarea-bordered mb-4 w-full"
        />
        <input
          name="price"
          required
          type="number"
          placeholder="Price"
          className="input input-bordered mb-4 w-full"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          required
          className="input input-bordered mb-4 w-full"
          type="url"
        />
        <Submit className="btn-block">
          Add Product
        </Submit>
      </form>
    </div>
  );
}
