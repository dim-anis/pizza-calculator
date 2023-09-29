import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="mt-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            What are Baker&apos;s Percentages?
          </AccordionTrigger>
          <AccordionContent>
            <article className="prose-sm md:prose">
              <p>
                Baker&apos;s percentages are a simple and effective way for
                bakers to express and calculate the proportions of ingredients
                in a bread recipe. It&apos;s like a special language that helps
                bakers communicate their recipes with precision, regardless of
                the batch size they&apos;re making.
              </p>
              <ol>
                <li>
                  <strong>Choose the Flour Weight as 100%:</strong>
                  <p>
                    Start by deciding how much flour you want to use in your
                    recipe. Let&apos;s say you&apos;re using 1000 grams of
                    flour. You would then consider this 100% of your recipe.
                  </p>
                </li>
                <li>
                  <strong>Express Other Ingredients as Percentages:</strong>
                  <p>
                    Now, you determine the proportions of other ingredients
                    relative to the flour. For example, if you&apos;re using 600
                    grams of water, you would calculate its percentage like
                    this:
                    <br />
                    <br />
                    Water Percentage = (Weight of Water / Weight of Flour) * 100
                    <br />
                    Water Percentage = (600g / 1000g) * 100 = 60%
                  </p>
                </li>
                <li>
                  <strong>Repeat for Other Ingredients:</strong>
                  <p>
                    Apply the same calculation for each ingredient you&apos;re
                    using. If you have 20 grams of yeast, you&apos;d calculate
                    its percentage based on the flour weight:
                    <br />
                    <br />
                    Yeast Percentage = (Weight of Yeast / Weight of Flour) * 100
                    <br />
                    Yeast Percentage = (20g / 1000g) * 100 = 2%
                  </p>
                </li>
                <li>
                  <strong>Adjust as Needed:</strong>
                  <p>
                    Baker&apos;s percentages allow you to easily scale your
                    recipe up or down. If you want to make a larger batch, you
                    can keep the same percentages, and it will ensure consistent
                    results.{" "}
                  </p>
                </li>
              </ol>
            </article>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            Why is it recommended to ferment the dough before baking?
          </AccordionTrigger>
          <AccordionContent>
            <article className="prose-sm md:prose">
              <p>
                Fermenting dough before baking is a crucial step in the
                bread-making process that has a significant impact on the final
                quality, flavor, and texture of the bread. There are several
                reasons why fermenting dough is beneficial:
              </p>
              <ol>
                <li>
                  <strong>Develops Flavor:</strong>
                  <p>
                    During fermentation, the yeast and bacteria present in the
                    dough consume sugars and produce carbon dioxide and organic
                    compounds. This process enhances the flavor complexity of
                    the bread, resulting in a more rich and nuanced taste.
                  </p>
                </li>
                <li>
                  <strong>Texture and Crumb Structure:</strong>
                  <p>
                    Fermentation allows the dough to relax and develop gluten,
                    which gives the bread structure. It contributes to the
                    formation of air pockets, creating the characteristic airy
                    and open crumb structure that many artisanal breads are
                    known for.
                  </p>
                </li>
                <li>
                  <strong>Improved Digestibility:</strong>
                  <p>
                    The fermentation process breaks down complex carbohydrates
                    and proteins, making them easier to digest. This can be
                    particularly beneficial for individuals who may have mild
                    sensitivities to gluten or find it challenging to digest
                    certain components of grains.
                  </p>
                </li>
                <li>
                  <strong>Nutrient Availability:</strong>
                  <p>
                    Fermentation increases the availability of nutrients in the
                    bread. It breaks down phytic acid, an antinutrient present
                    in grains, which can inhibit the absorption of certain
                    minerals like iron, zinc, and calcium. Fermentation makes
                    these minerals more accessible for our bodies to absorb.
                  </p>
                </li>
                <li>
                  <strong>Extended Shelf Life:</strong>
                  <p>
                    The natural acids produced during fermentation help preserve
                    the bread and extend its shelf life. This can reduce the
                    need for artificial preservatives in bread.
                  </p>
                </li>
                <li>
                  <strong>Aesthetic Appeal:</strong>
                  <p>
                    Proper fermentation contributes to a beautiful crust and
                    color in the baked bread. It also helps control the
                    expansion of the dough during baking, leading to an even
                    rise and a more uniform shape.
                  </p>
                </li>
                <li>
                  <strong>Controlled Yeast Activity:</strong>
                  <p>
                    Fermentation gives you better control over the yeast
                    activity and dough development. It allows you to slow down
                    or speed up the process based on the desired outcome, which
                    can be particularly useful for managing baking schedules.
                  </p>
                </li>
                <li>
                  <strong>Enriched Aroma:</strong>
                  <p>
                    The gases and compounds produced during fermentation
                    contribute to the wonderful aroma of freshly baked bread.
                  </p>
                </li>
              </ol>
            </article>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
