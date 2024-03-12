import Link from "next/link";
import logo from "@/assets/blissBazaarLogo.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCart } from "@/client/db/cart";
import CartButton from "./CartButton";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { authSelections } from "../api/auth/[...nextauth]/route";

async function searchProds(formData:FormData) {
    "use server";
    const query = formData.get("searchSite")?.toString();
    if(query){
        redirect("/search?query=" + query);
    }
}


export default async function Navbar() {
    const cart = await getCart();
    const session = await getServerSession(authSelections);
  return (
    <div className="bg bg-base-100">
      <div className="navbar max-w-5xl m-auto flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Bliss Bazaar - Logo" />
            Bliss Bazaar
          </Link>
        </div>
        <div className="flex-none gap-2">
            <form action={searchProds}> 
                <div className="form-control">
                    <input name="searchSite" placeholder="Search" className="input input-bordered w-full min-w-[100px]"></input>
                </div>
            </form>
            <CartButton cart = {cart}/>
            <UserButton session={session}></UserButton>
        </div>
      </div>
    </div>
  );
}
