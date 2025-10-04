"use server"

import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/user.action";

const LogoutServerButton = () => {
  return (
    <button 
      onClick={logout} 
      className="flex items-center gap-2 cursor-pointer hover:opacity-50 transition-opacity shrink-0 bg-amber-950 p-5 rounded-md"
    > 
    <span className="capitalize">server logout</span> <LogOut /> 
    </button>
  )
}

export default LogoutServerButton