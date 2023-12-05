import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Pizza } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { MainNavItem } from "@/lib/definitions";

type MobileNavProps = {
  items: MainNavItem[];
  children?: React.ReactNode;
};
export function MobileNav({ children, items }: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden",
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Pizza />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        {children}
        <NavigationMenu className="gap-6 text-muted-foreground">
          <NavigationMenuList className="flex flex-col">
            {items?.length
              ? items.map((page, index) => (
                  <NavigationMenuItem key={index}>
                    <Link href={page.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {page.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))
              : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}