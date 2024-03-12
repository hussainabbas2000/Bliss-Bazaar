"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

function red(){
  window.location.href = "/adminDashboard"
}

const error = ({error,reset}:{error: Error, reset: () => void })=>{
  return(
    <div>
    <div className="font-bold text-lg">Error: {error.message}! Try to debug the issue.</div>
    <button onClick={red} className="btn btn-link">Go to home</button>
    </div>
  
  );
}

export default error

