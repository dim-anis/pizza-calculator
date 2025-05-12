import { getIngredients } from "@/lib/queries";
import ListItem from "../_components/list-item";
import { deleteIngredient } from "@/lib/actions";
import Empty from "@/components/empty";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default async function IngredientsPage() {
  const ingredients = await getIngredients();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Ingredients
        </h2>
        <Link
          href={"/dashboard/ingredients/new"}
          className={buttonVariants({ size: "sm" })}
        >
          <Icons.add />
          Add ingredient
        </Link>
      </div>
      {ingredients.length === 0 ? (
        <Empty
          title={"No ingredients found"}
          description={"You don't have any ingredients."}
        >
          <Link
            className={`${buttonVariants()}`}
            href={`/dashboard/ingredients/new`}
          >
            <Icons.add />
            Create ingredient
          </Link>
        </Empty>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {ingredients.map((i) => (
            <ListItem
              key={i.id}
              itemId={i.id}
              itemType="Ingredient"
              onDeleteAction={deleteIngredient}
              href={`/dashboard/ingredients/${i.id}`}
              title={i.name}
              tags={[
                {
                  title: i.type.type,
                  href: `/dashboard/ingredients/${i.type.type}`,
                },
              ]}
            />
          ))}
        </ul>
      )}
    </>
  );
}
