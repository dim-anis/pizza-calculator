"use client";

import { toTitleCase, validationErrorMessages } from "@/app/_utils/helpers";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_INPUT_VALUE = 99999;

const CreateRecipeSchema = z.object({
  folderName: z.coerce.string(),
  recipeName: z.coerce.string(),
  flourAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
  waterAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
  saltAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .default(0),
});

export type CreateRecipeData = z.infer<typeof CreateRecipeSchema>;

type Params = {
  name: string;
  id: string;
};

export default function CreateRecipeForm({
  folders,
}: {
  folders: { id: string; name: string }[];
}) {
  const params: Params = useParams();
  const folderName = params["name"];
  const form = useForm<CreateRecipeData>({
    mode: "onChange",
    resolver: zodResolver(CreateRecipeSchema),
    defaultValues: {
      folderName: toTitleCase(decodeURIComponent(folderName)),
    },
  });

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-around gap-5 bg-white"
      >
        <FormField
          control={form.control}
          name="recipeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter recipe name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="folderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose folder</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a folder to save your recipe in" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {folders.map((style) => {
                    return (
                      <SelectItem key={style.id} value={style.name}>
                        {style.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flourAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flour</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter the amount of flour (in grams)"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value.replace(/[^0-9]/, ""))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="waterAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter the amount of water (in grams)"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value.replace(/[^0-9]/, ""))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="saltAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salt</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter the amount of salt (in grams)"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value.replace(/[^0-9]/, ""))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Link
            href={`/myrecipes/${folderName}`}
            className={`${buttonVariants({ variant: "secondary" })}`}
          >
            Cancel
          </Link>
          <Button>Create Recipe</Button>
        </div>
      </form>
    </Form>
  );
}
