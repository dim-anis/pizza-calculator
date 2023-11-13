import Link from "next/link";

type RecipeItemProps = {
  folderName: string;
  desc: string;
  recipeId: string;
};

export default function RecipeItem(props: RecipeItemProps) {
  const { folderName, recipeId, desc } = props;

  return (
    <Link href={`/myrecipes/${folderName}/${recipeId}`}>
      <li className="flex cursor-pointer items-start justify-between rounded-lg p-4">
        <div className="w-full">
          <h2 className="text-base font-bold text-gray-900">{name}</h2>
          <p className="truncate text-sm text-slate-700">{desc}</p>
        </div>
      </li>
      <span className="sr-only">View</span>
    </Link>
  );
}
