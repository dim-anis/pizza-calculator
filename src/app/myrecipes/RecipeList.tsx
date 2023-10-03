import { ReactNode } from "react"

type RecipeListProps = {
  children?: ReactNode | ReactNode[]
}

export default function RecipeList(props: RecipeListProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {props.children}
    </div>
  )
}
