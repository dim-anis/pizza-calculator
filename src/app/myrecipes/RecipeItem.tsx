type RecipeItemProps = {
  name: string,
  desc: string
}

export default function RecipeItem(props: RecipeItemProps) {
  const { name, desc } = props;

  return (
    <div className="p-4 border border-input rounded-md">
      <h3 className="font-medium leading-none">{name}</h3>
    </div>
  )
}
