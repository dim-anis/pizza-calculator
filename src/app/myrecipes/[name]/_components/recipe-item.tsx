import { Recipe } from "@prisma/client";
import Link from "next/link";

export default function RecipeItem({
  recipe,
  folderName,
}: {
  recipe: Recipe;
  folderName: string;
}) {
  return (
    <Link href={`/myrecipes/${folderName}/${recipe.id}`}>
      <li
        className={
          "-mx-2 flex cursor-pointer items-start justify-between rounded-lg p-2 hover:bg-accent hover:text-accent-foreground"
        }
      >
        <div>
          <h3 className="text-base">{recipe.name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {new Date(recipe.createdAt).toLocaleDateString()}
          </p>
        </div>
      </li>
    </Link>
  );
}
