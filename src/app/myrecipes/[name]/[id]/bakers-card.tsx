import { Candy, Droplet, Milk, Popcorn, Wheat } from "lucide-react";

export default function BakersCard({
  name,
  percentage,
}: {
  name: "water" | "flour" | "salt" | "oil" | "sugar";
  percentage: number;
}) {
  const icons = {
    water: <Droplet className="h-4 w-4 text-muted-foreground" />,
    flour: <Wheat className="h-4 w-4 text-muted-foreground" />,
    salt: <Popcorn className="h-4 w-4 text-muted-foreground" />,
    oil: <Milk className="h-4 w-4 text-muted-foreground" />,
    sugar: <Candy className="h-4 w-4 text-muted-foreground" />,
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h4 className="text-sm font-medium tracking-tight">{name}</h4>
        {icons[name]}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{percentage}</div>
      </div>
    </div>
  );
}
