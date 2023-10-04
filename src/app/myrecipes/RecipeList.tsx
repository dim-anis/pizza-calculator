import { ReactNode } from "react"

type RecipeListProps = {
  children?: ReactNode | ReactNode[]
}

export default function RecipeList(props: RecipeListProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
      {props.children}
    </div>
  )
}
