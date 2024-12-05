import { prisma } from "@/client/db/prisma";
import { error } from "console";
import { redirect } from "next/navigation";
import Submit from "@/components/SubmitButton";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { addProd } from "./actions";
export const metadata = {
  title: "Add Product - Bliss Bazaar",
};


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
