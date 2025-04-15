"use client";

import Link from "next/link";
import SideBarItem from "./sidebar-item";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";

const sideNavItems = [
  {
    id: "new-recipe",
    title: "Create recipe",
    href: "/dashboard/recipes/new",
    icon: Icons.add,
  },
  {
    id: "ingredients",
    title: "Ingredients",
    href: "/dashboard/ingredients",
    icon: Icons.ingredient,
  },
  {
    id: "all-recipes",
    title: "All recipes",
    href: "/dashboard/recipes",
    icon: Icons.all,
  },
];

export default function SidebarNav() {
  const path = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {sideNavItems.map((item) => (
        <Link href={item.href} key={item.id}>
          <SideBarItem
            title={item.title}
            isActive={path === item.href}
            left={<item.icon className="h-4 w-4 mr-2 text-muted-foreground" />}
          />
        </Link>
      ))}
    </nav>
  );
}
