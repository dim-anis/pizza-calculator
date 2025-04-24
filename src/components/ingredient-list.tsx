import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { roundNumTo } from "@/lib/helpers";
import { RecipeWithIngredients } from "@/lib/types";

type IngredientListProps = {
  ingredients: (RecipeWithIngredients["ingredients"][number] & {
    percentage: number;
  })[];
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
          <TableHead className="text-muted-foreground">Percentage</TableHead>
          <TableHead className="text-muted-foreground text-right">
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
            <TableCell className="font-medium text-muted-foreground">
              {roundNumTo(ingredient.percentage, 1)}%
            </TableCell>
            <TableCell className="font-medium text-right">
              {roundNumTo(ingredient.weightInGrams, 1)} g
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right">
            {`~${Math.round(totalWeight)}`} g
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
