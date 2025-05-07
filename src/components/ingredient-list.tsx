import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateIngredientRatiosNew, roundNumTo } from "@/lib/helpers";

type IngredientListProps = {
  ingredients: ReturnType<typeof calculateIngredientRatiosNew>;
};
function getAllSources(
  flatIngredients: ReturnType<typeof calculateIngredientRatiosNew>,
) {
  const sources = new Set<string>();

  for (const ing of flatIngredients) {
    for (const ingSource of ing.sources) {
      sources.add(ingSource.source);
    }
  }

  return Array.from(sources);
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  const totalWeight = ingredients.reduce(
    (total, curr) => (total += curr.total),
    0,
  );

  const sources = getAllSources(ingredients);

  const rows = ingredients.map(({ ingredient, ...data }) => {
    return {
      ingredient,
      total: data.total,
      percentage: data.percentage,
      sources: sources.map(
        (sourceName) =>
          data.sources.find(({ source }) => source === sourceName)?.quantity ||
          0,
      ),
    };
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground">Ingredient</TableHead>
          <TableHead className="text-muted-foreground text-right">
            Baker&apos;s %
          </TableHead>
          <TableHead className="text-muted-foreground text-right">
            Total quantity
          </TableHead>
          {sources.length > 1 &&
            sources.map((sourceName, idx) => (
              <TableHead
                key={idx}
                className="text-muted-foreground text-right"
              >{`Quantity in ${sourceName}`}</TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{r.ingredient}</TableCell>
            <TableCell className="text-right">
              {roundNumTo(r.percentage, 1)}%
            </TableCell>
            <TableCell className="font-medium text-right">
              {roundNumTo(r.total)}g
            </TableCell>
            {sources.length > 1 &&
              r.sources.map((sourceQuantity, idx) => (
                <TableCell key={idx} className="text-right">
                  {roundNumTo(sourceQuantity, 1)}g
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right">
            {`~${Math.round(totalWeight)}`}g
          </TableCell>
          {sources.length > 1 &&
            sources.map((_, idx) => (
              <TableCell
                key={idx}
                className="text-muted-foreground text-right"
              ></TableCell>
            ))}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
