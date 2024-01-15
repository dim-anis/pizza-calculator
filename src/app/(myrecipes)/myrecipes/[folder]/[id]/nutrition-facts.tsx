import { Separator } from "@/components/ui/separator";

export default function NutrtitionFacts({
  calories,
  protein,
  fat,
  carbs,
}: {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold lg:text-lg">Nutrition per serving</h3>
      <div className="flex justify-between">
        <div className="flex-1 space-y-2  text-center">
          <p className="text-sm text-muted-foreground">{"Calories"}</p>
          <p className="font-bold">{calories}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex-1 space-y-2  text-center">
          <p className="text-sm text-muted-foreground">{"Protein"}</p>
          <p className="font-bold">{protein} g</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex-1 space-y-2  text-center">
          <p className="text-sm text-muted-foreground">{"Fat"}</p>
          <p className="font-bold">{fat} g</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex-1 space-y-2  text-center">
          <p className="text-sm text-muted-foreground">{"Carbs"}</p>
          <p className="font-bold">{carbs} g</p>
        </div>
      </div>
    </div>
  );
}
