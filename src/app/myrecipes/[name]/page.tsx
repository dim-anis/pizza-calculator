import RecipeList from "./_components/recipe-list";

export default async function Page({ params }: { params: { name: string } }) {
  return <RecipeList folderName={params.name} />;
}
