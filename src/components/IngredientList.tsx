import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DoughIngredients } from "@/lib/definitions";
import { ingredients, optionalIngredients } from "../lib/data";

type IngredientListProps = {
  ingredientAmounts: Record<keyof DoughIngredients, number>;
};

export default function IngredientList({
  ingredientAmounts,
}: IngredientListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ingredient</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map(
          (ingredient) =>
            ingredientAmounts[ingredient.id] > 0 && (
              <TableRow key={ingredient.id}>
                <TableCell>{ingredient.label}</TableCell>
                <TableCell className="text-right">
                  {ingredientAmounts[ingredient.id]}g
                </TableCell>
              </TableRow>
            ),
        )}
        {optionalIngredients.map(
          (ingredient) =>
            ingredientAmounts[ingredient.id] > 0 && (
              <TableRow key={ingredient.id}>
                <TableCell>{ingredient.label}</TableCell>
                <TableCell className="text-right">
                  {ingredientAmounts[ingredient.id]}g
                </TableCell>
              </TableRow>
            ),
        )}
      </TableBody>
    </Table>
  );
}
