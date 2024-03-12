"use client";
import { Session } from "next-auth"
import Image from "next/image";
import { use } from "react";
import userIcon from "../../assets/userIcon.ico"
import { signIn, signOut } from "next-auth/react";
export default function UserButton({session}: UserButtonProps){
    const user = session?.user;
    return(
        <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
                {user? <Image className="w-10 rounded-full" width={45} height={45} alt="Profile Picture" src={user?.image || userIcon}/>:<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>}
            </label>
            <ul className="bg-base-100 p-2 shadow menu dropdown-content mt-3 menu-sm z-30 rounded-box w-52" tabIndex={0}>
                <li>
                    {user? <button onClick={()=> signOut({callbackUrl: "/"})}>Log Out</button>:<button onClick={()=>signIn()}>Log In</button>}
                </li>
            </ul>
        </div>
    )
}
interface UserButtonProps  {
    session: Session | null,

}