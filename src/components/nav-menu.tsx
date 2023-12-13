"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { MobileNav } from "./mobile-nav";
import { MainNavItem } from "@/lib/definitions";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

type MainNavProps = {
  children?: React.ReactNode;
  items?: MainNavItem[];
};

export default function NavBar({ children, items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-10 w-10" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu className="hidden gap-6 text-muted-foreground md:flex">
        <NavigationMenuList>
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
      <Button
        variant={"ghost"}
        className="flex items-center space-x-2 px-1 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.panelClose /> : <Icons.panelOpen />}
        <span className="font-bold">Menu</span>
      </Button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
