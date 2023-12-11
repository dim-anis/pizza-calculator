import RecipeList from "./_components/recipe-list";

export default async function FolderPage({
  params,
}: {
  params: { folder: string };
}) {
  return <RecipeList folderName={params.folder} />;
}
