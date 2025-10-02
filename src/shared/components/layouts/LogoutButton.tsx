"use client"

import { LogOut } from "lucide-react";
import { signOut } from "../../../../auth";
import { redirect } from "next/navigation";
import { PAGE } from "@/config/page.config";

const LogoutButton = () => {

  const handleLogout = async () => {
    await signOut()
  }
  
  return (
    <button onClick={handleLogout}> <LogOut /> </button>
    // <LogOut onClick={handleLogout} />
  )
}

export default LogoutButton