"use server"

import { ShoppingCart, UserIcon, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PAGE } from "@/config/page.config";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { auth } from "../../../../auth";
import LogoutButton from "./LogoutButton";

const Header = async () => {
  const session = await auth()

  return (
    <header className="py-10 flex justify-between items-center">
      <Link href="/">
        <Image src="/globe.svg" alt="logo" width={30} height={30} priority />
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link href={PAGE.BUCKET} className="hover:opacity-50 transition-opacity">
          <ShoppingCart />
        </Link>
        {session ? (
          <LogoutButton />
        ) : (
          <>
          <Link href={PAGE.LOGIN} className="hover:opacity-50 transition-opacity">
            <UserIcon />
          </Link>
          <Link href={PAGE.REGISTER} className="hover:opacity-50 transition-opacity">
            <UserPlus />
          </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header