import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecipeIngredientWithName } from "@/lib/types";

type IngredientListProps = {
  ingredients: (RecipeIngredientWithName & { weight: number })[];
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  const totalWeight = ingredients.reduce(
    (totalWeight, curr) => totalWeight + curr.weight,
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
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell className="font-medium">
              {ingredient.ingredient.name}
            </TableCell>
            <TableCell className="text-right">
              {Number.isInteger(ingredient.weight)
                ? ingredient.weight
                : Math.round(ingredient.weight * 10) / 10}{" "}
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
