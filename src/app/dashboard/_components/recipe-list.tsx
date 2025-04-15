import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Empty from "@/components/empty";
import { Folder, Recipe } from "@prisma/client";
import ListItem from "../ingredients/_components/ingredient-item";
import { deleteRecipe } from "@/lib/actions";

export default async function RecipeList({
  recipes,
}: {
  recipes: (Recipe & { folders: Folder[] })[];
}) {
  return (
    <>
      {recipes.length === 0 ? (
        <Empty
          title={"No recipes found"}
          description={"You don't have any recipes in this folder yet."}
        >
          <Link
            className={`${buttonVariants()}`}
            href={`/dashboard/recipes/new`}
          >
            <Icons.add />
            Add recipe
          </Link>
        </Empty>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {recipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              href={`/dashboard/recipes/${recipe.id}`}
              itemId={recipe.id}
              itemType="Recipe"
              title={recipe.name}
              onDeleteAction={deleteRecipe}
              tags={recipe.folders.map((f) => ({
                title: f.name,
                href: `/dashboard/folders/${f.id}`,
              }))}
            />
          ))}
        </ul>
      )}
    </>
  );
}
