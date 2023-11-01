type RecipeItemProps = {
  name: string;
  desc: string;
};

export default function RecipeItem(props: RecipeItemProps) {
  const { name, desc } = props;

  return (
    <div className="space-y-1 rounded-md border border-input p-4">
      <h3 className="text-sm font-medium leading-none text-gray-900">{name}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
