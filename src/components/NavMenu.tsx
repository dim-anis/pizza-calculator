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
import { Pizza } from "lucide-react";

const pages = [
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
];

export default function Navbar() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Pizza />
        <span className="hidden font-bold sm:inline-block">
          Pizza Calculator
        </span>
      </Link>
      <NavigationMenu className="text-muted-foreground">
        <NavigationMenuList>
          {pages.map((page, index) => (
            <NavigationMenuItem key={index}>
              <Link href={page.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {page.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
