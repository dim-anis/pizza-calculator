import { ReactNode } from "react"

type RecipeListProps = {
  children?: ReactNode | ReactNode[]
}

export default function RecipeList(props: RecipeListProps) {
  return (
    <div className="flex flex-col gap-4">
      {props.children}
    </div>
  )
}
