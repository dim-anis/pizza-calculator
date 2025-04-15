import Link from "next/link";
import IngredientListItem from "./ingredient-type-item";
import { getIngredientTypesWithCount } from "@/lib/queries";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default async function IngredientTypeList() {
  const [ingredientTypesWithCount, totalIngredientCount] =
    await getIngredientTypesWithCount();
  return (
    <>
      <Link
        href="/dashboard/ingredients/new"
        className={`${buttonVariants({ variant: "outline" })}`}
      >
        <Icons.add className="h-4 w-4" />
        Create new ingredient
      </Link>
      <nav>
        <ul className="flex flex-col space-y-1 lg:space-x-0">
          <IngredientListItem
            href={`/dashboard/ingredients`}
            ingredientTypeName={"All ingredients"}
            ingredientCount={totalIngredientCount}
          />
          {ingredientTypesWithCount.map((ic) => (
            <IngredientListItem
              key={ic.id}
              href={`/dashboard/ingredients/${encodeURIComponent(ic.type)}`}
              ingredientTypeName={ic.type}
              ingredientCount={ic._count.ingredients}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
