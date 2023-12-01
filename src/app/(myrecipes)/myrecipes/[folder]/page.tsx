import RecipeList from "./_components/recipe-list";

export default async function Page({ params }: { params: { folder: string } }) {
  return <RecipeList folderName={params.folder} />;
}
