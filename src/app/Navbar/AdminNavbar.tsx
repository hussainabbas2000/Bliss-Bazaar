import Link from "next/link";
import logo from "@/assets/blissBazaarLogo.png";
import Image from "next/image";
import AdminLogout from "./AdminLogout";
import { handleChangeSignOut } from "../adminDashboard/actions";


export default async function Navbar() {
  return (
    <div className="bg bg-base-100">
      <div className="navbar max-w-5xl m-auto flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Link href="/adminDashboard" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Bliss Bazaar - Logo" />
            Bliss Bazaar
          </Link>
        </div>
        <div className="flex-none gap-2">
            <AdminLogout signout={handleChangeSignOut}></AdminLogout>
        </div>
        <div className="flex-none gap-2">
          <Link href={"/adminDashboard/editProfile"}>
          
            <button className="btn bg-blue-600">
              Edit Profile
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
}
