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
    <button onClick={handleLogout}> <LogOut /> </button>
  )
}

export default LogoutButton