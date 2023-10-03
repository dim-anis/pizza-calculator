type RecipeItemProps = {
  name: string,
  desc: string
}

export default function RecipeItem(props: RecipeItemProps) {
  const { name, desc } = props;

  return (
    <div className="flex flex-col space-y-1 p-4 rounded-xl border bg-card text-card-foreground shadow">
      <h3 className="font-semibold leading-none tracking-tight">{name}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}
