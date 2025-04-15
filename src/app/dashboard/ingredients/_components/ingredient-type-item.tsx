"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  ingredientTypeName: string;
  ingredientCount: number;
  href: string;
};

export default function IngredientListItem({
  ingredientTypeName,
  ingredientCount,
  href,
}: Props) {
  const path = usePathname();
  return (
    <Link href={href}>
      <li
        className={`${
          path === href
            ? "bg-muted hover:bg-muted font-medium"
            : "bg-transparent hover:bg-muted"
        } inline-flex h-9 w-full items-center justify-between rounded-md bg-muted px-4 py-2 text-sm transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
      >
        <span className="truncate">{ingredientTypeName}</span>
        <span className="ml-2 flex w-6 justify-center rounded-full bg-slate-200 px-2 py-1 text-xs">
          {ingredientCount}
        </span>
      </li>
    </Link>
  );
}
