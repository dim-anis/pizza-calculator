import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "./_utils/helpers";

type IngredientListProps = {
  ingredients: Record<string, number>;
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ingredient</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(ingredients).map(
          ([ingredient, amount]) =>
            amount > 0 && (
              <TableRow key={ingredient}>
                <TableCell>{capitalize(ingredient)}</TableCell>
                <TableCell className="text-right">{amount}g</TableCell>
              </TableRow>
            ),
        )}
      </TableBody>
    </Table>
  );
}
