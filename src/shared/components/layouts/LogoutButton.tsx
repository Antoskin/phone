"use client"

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { PAGE } from "@/config/page.config";

const LogoutButton = () => {

  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: PAGE.LOGIN,
      redirect: true 
    });
  }
  
  return (
    <button onClick={handleLogout} className="flex items-center gap-2 cursor-pointer hover:opacity-50 transition-opacity shrink-0 bg-blue-950 p-5 rounded-md"> 
      <span className="capitalize">client logout</span> <LogOut /> 
    </button>
  )
}

export default LogoutButton