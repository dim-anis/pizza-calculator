import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecipeWithIngredients } from "@/lib/types";

type IngredientListProps = {
  ingredients: RecipeWithIngredients["ingredients"][number][];
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  const totalWeight = ingredients.reduce(
    (totalWeight, curr) => totalWeight + curr.weightInGrams,
    0,
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground">Ingredient</TableHead>
          <TableHead className="text-right text-muted-foreground">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">
              {ingredient.ingredient.name}
            </TableCell>
            <TableCell className="text-right">
              {Number.isInteger(ingredient.weightInGrams)
                ? ingredient.weightInGrams
                : Math.round(ingredient.weightInGrams * 10) / 10}{" "}
              g
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">
            {`~${Math.round(totalWeight)}`} g
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
