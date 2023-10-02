import { PizzaStyleName, snakeCaseToSpaces } from "./calculator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { capitalize } from "./calculator";

type IngredientsProps = {
  pizzaStyle: PizzaStyleName,
  recipeIngredients: Record<string, number>
}

export default function IngredientList(props: IngredientsProps) {
  const recipeNameFormatted = snakeCaseToSpaces(props.pizzaStyle).split(" ").map((word) => capitalize(word)).join(" ");
  const ingredients = Object.entries(props.recipeIngredients); 

  return (
    <div className="max-w-5xl mx-auto pt-10 sm:pt-12 lg:pt-16">
      <h2 className="text-3xl text-slate-900 font-bold sm:text-2xl lg:text-4xl tracking-tight">{recipeNameFormatted}</h2>
      <p className="mt-5 text-lg text-slate-600 max-w-3xl">For this recipe you will need:</p>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            ingredients.map(([ingredient, amount]) => (
              <TableRow key={ingredient}>
                <TableCell>
                  {capitalize(ingredient)}
                </TableCell>
                <TableCell className="text-right">{amount}g</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}
