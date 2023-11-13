import RecipeList from "./recipe-list";

export default async function Page({ params }: { params: { name: string } }) {
  return <RecipeList folderName={params.name} />;
}
