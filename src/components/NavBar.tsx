import { Pizza } from "lucide-react";
import NavMenu from "./NavMenu";
import UserDropdown from "./UserDropdown";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="mx-auto flex w-[min(100%-3rem,_90ch)] items-center justify-between py-2 font-semibold leading-6 text-slate-700 lg:py-3">
      <div className="flex items-center lg:gap-8">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold tracking-tight">
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
