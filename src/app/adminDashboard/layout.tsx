import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "../Footer";

import AdminNavbar from "../Navbar/AdminNavbar"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bliss Bazaar",
  description: "The place where your money disappears",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          <AdminNavbar />
          <main className="p-5 m-auto min-w-[300px] max-w-5xl">{children}</main>
          <Footer/>
      
      </body>
      

    </html>
  );
}
