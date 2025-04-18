import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Save custom recipes",
    subtitle:
      "Create and store your own formulas using baker’s percentages — perfect for experimenting and refining.",
    icon: Icons.edit,
  },

  {
    title: "Build and edit your ingredient list",
    subtitle:
      "Add your favorite flours, starters, and inclusions. Adjust hydration and ratios on the fly.",
    icon: Icons.list,
  },

  {
    title: "Scale with precision",
    subtitle:
      "Easily adjust batch sizes or test variations with accurate scaling that keeps your percentages intact.",
    icon: Icons.copy,
  },
];

export default function FeatureSection() {
  return (
    <section className="container mx-auto space-y-12 py-8 lg:py-12">
      <div className="mx-auto max-w-3xl flex flex-col gap-4 items-center text-center">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">
          Make every bake better
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Creating an account gives you access to powerful tools built for
          serious home bakers and professionals alike.
        </p>
      </div>
      <div className="mx-auto max-w-2xl grid justify-center gap-4 md:max-w-4xl md:grid-cols-3">
        {features.map((feature, idx) => (
          <Card key={idx} className="shadow-none">
            <CardContent>
              <div
                key={idx}
                className="flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center">
                  <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full items-center justify-center bg-muted font-bold">
                    {<feature.icon />}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
