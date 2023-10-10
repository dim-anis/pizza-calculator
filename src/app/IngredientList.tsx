import { PizzaStyleName, snakeCaseToSpaces } from "./calculator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "./calculator";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IngredientsProps = {
  pizzaStyle: PizzaStyleName;
  recipeIngredients: Record<string, number>;
};

export default function IngredientList(props: IngredientsProps) {
  const recipeNameFormatted = snakeCaseToSpaces(props.pizzaStyle)
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
  const ingredients = Object.entries(props.recipeIngredients);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-slate-900 font-bold lg:text-2xl tracking-tight">
          {recipeNameFormatted}
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link">
                <Bookmark className="hover:fill-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save recipe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="mt-5 text-lg text-slate-600 max-w-3xl">Ingredients:</p>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map(([ingredient, amount]) => (
            <TableRow key={ingredient}>
              <TableCell>{capitalize(ingredient)}</TableCell>
              <TableCell className="text-right">{amount}g</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
