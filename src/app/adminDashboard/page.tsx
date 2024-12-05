import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import AdminNavbar from "../Navbar/AdminNavbar"
import Footer from "../Footer";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
const AdminHome = async({
  }) => {
  
  if(cookies().get("localAdminID")?.value === ""){
    redirect("/admin/adminLogin")
  }

  return (
    <div className="flex flex-col gap-10">
          <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
              <div className="hero-overlay bg-opacity-60">
              </div>
                  <div className="hero-content text-center text-neutral-content">
                      <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Add Product</h1>
                            <p className="mb-5">Improve the catalogue of the site</p>
                            <Link href={"/adminDashboard/addProduct"}>
                              <button className="btn btn-primary">Get Started</button>
                            </Link>
                        </div>
                    </div>
            </div>
            <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
              <div className="hero-overlay bg-opacity-60">
              </div>
                  <div className="hero-content text-center text-neutral-content">
                      <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Delete Product</h1>
                            <p className="mb-5">Remove outdated items from catalogue</p>
                            <Link href={"/adminDashboard/deleteProduct"}>
                              <button className="btn btn-primary">Get Started</button>
                            </Link>
                        </div>
                    </div>
            </div>
            <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
              <div className="hero-overlay bg-opacity-60">
              </div>
                  <div className="hero-content text-center text-neutral-content">
                      <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Edit Product</h1>
                            <p className="mb-5">Keep the catalogue updated with market</p>
                            <Link href={"/adminDashboard/editProduct"}>
                              <button className="btn btn-primary">Get Started</button>
                            </Link>
                        </div>
                    </div>
            </div>
      </div>
  );
};
export default AdminHome;


