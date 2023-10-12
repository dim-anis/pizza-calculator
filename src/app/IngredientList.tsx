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
import { PizzaStyle } from "./page";

type IngredientListProps = {
  pizzaRecipeName: PizzaStyle["name"];
  recipeIngredients: Record<string, number>;
};

export default function IngredientList(props: IngredientListProps) {
  const { pizzaRecipeName, recipeIngredients } = props;

  return (
    <div className="w-full p-8 lg:mt-5 rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-slate-900 font-bold lg:text-2xl tracking-tight">
          {pizzaRecipeName}
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
          {Object.entries(recipeIngredients).map(([ingredient, amount]) => (
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
