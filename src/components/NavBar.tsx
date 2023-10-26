import { Pizza } from "lucide-react";
import NavMenu from "./NavMenu";
import UserDropdown from "./UserDropdown";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="py-2 lg:py-3 flex items-center justify-between text-slate-700 font-semibold leading-6 w-[min(100%-3rem,_90ch)] mx-auto">
      <div className="flex items-center lg:gap-8">
        <Link href="/">
          <div className="flex gap-2 font-bold tracking-tight items-center">
            <Pizza />
            <p>Pizza Calculator</p>
          </div>
        </Link>
        <NavMenu />
      </div>
      <UserDropdown />
    </div>
  );
}
