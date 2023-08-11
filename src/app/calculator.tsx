import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Calculator() {
  return (
    <>
    <div className="pt-10">
      <Label htmlFor="hydration">Hydration</Label>
      <Input type="text" id="hydration" placeholder="Enter desired hydration"/>
    </div>
    <div>
      <Label htmlFor="weight">Weight</Label>
      <Input type="text" id="weight" placeholder="Enter desired weight"/>
    </div>
    <div>
      <Label htmlFor="number">Number of pizzas</Label>
      <Input type="text" id="number" placeholder="Enter desired number"/>
    </div>
    </>
  )
}
