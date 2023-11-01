import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalize } from "./_utils/helpers";

type IngredientListProps = {
  userRecipe: {
    name: string;
    ingredients: Record<string, number>;
  };
};

export default function IngredientList({ userRecipe }: IngredientListProps) {
  return (
    <div className="w-full rounded-xl border bg-card p-8 text-card-foreground shadow lg:mt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">
          {userRecipe.name}
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
      <p className="mt-5 max-w-3xl text-lg text-slate-600">Ingredients:</p>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(userRecipe.ingredients).map(
            ([ingredient, amount]) => (
              <TableRow key={ingredient}>
                <TableCell>{capitalize(ingredient)}</TableCell>
                <TableCell className="text-right">{amount}g</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
