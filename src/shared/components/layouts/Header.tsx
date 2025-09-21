import { ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PAGE } from "@/config/page.config";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = () => {
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
        <Link href={PAGE.LOGIN} className="hover:opacity-50 transition-opacity">
          <UserIcon />
        </Link>
      </div>
    </header>
  )
}

export default Header