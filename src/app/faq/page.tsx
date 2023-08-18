import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Faq() {
  return (
    <article className="prose">
      <h1>Frequently Asked Questions</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What are Baker's Percentages?</AccordionTrigger>
          <AccordionContent>
              <p>Baker's percentages are a simple and effective way for bakers to express and calculate the proportions of ingredients in a bread recipe. It's like a special language that helps bakers communicate their recipes with precision, regardless of the batch size they're making.</p>
              <h3>How It Works:</h3>
              <ol>
                <li><strong>Choose the Flour Weight as 100%:</strong>
                  <p>
                    Start by deciding how much flour you want to use in your recipe. Let's say you're using 1000 grams of flour. You would then consider this 100% of your recipe.
                  </p>
                </li>
                <li><strong>Express Other Ingredients as Percentages:</strong>
                  <p>
                    Now, you determine the proportions of other ingredients relative to the flour. For example, if you're using 600 grams of water, you would calculate its percentage like this:<br />
                    <br />
                    Water Percentage = (Weight of Water / Weight of Flour) * 100<br />
                    Water Percentage = (600g / 1000g) * 100 = 60%
                  </p>
                </li>
                <li><strong>Repeat for Other Ingredients:</strong>
                  <p>
                    Apply the same calculation for each ingredient you're using. If you have 20 grams of yeast, you'd calculate its percentage based on the flour weight:<br />
                    <br />
                    Yeast Percentage = (Weight of Yeast / Weight of Flour) * 100<br />
                    Yeast Percentage = (20g / 1000g) * 100 = 2%
                  </p>
                </li>
                <li><strong>Adjust as Needed:</strong>
                  <p>
                    Baker's percentages allow you to easily scale your recipe up or down. If you want to make a larger batch, you can keep the same percentages, and it will ensure consistent results.                  </p>
                </li>
              </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Why is it recommended to ferment dough before baking?</AccordionTrigger>
          <AccordionContent>
              Fermenting dough before baking is a crucial step in the bread-making process that has a significant impact on the final quality, flavor, and texture of the bread. There are several reasons why fermenting dough is beneficial:
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  )
}
