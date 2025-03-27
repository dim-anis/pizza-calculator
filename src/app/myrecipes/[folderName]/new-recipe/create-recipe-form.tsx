"use client";

import { getArrayFromOneTo } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createRecipe } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, useFieldArray, useForm } from "react-hook-form";
import { RecipeForm, recipeSchema } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import SubmitButton from "@/components/submit-button";
import { Alert } from "@/components/alert-destructive";
import { Folder, Ingredient } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { Icons } from "@/components/icons";

type Props = {
  userFolders: Folder[];
  userIngredients: Ingredient[];
};

export default function CreateRecipeForm({
  userFolders,
  userIngredients,
}: Props) {
  const [selectIngredientsDialogOpen, setSelectIngredientsDialogOpen] =
    useState(false);
  const [selectFoldersDialogOpen, setSelectFoldersDialogOpen] = useState(false);

  const [pending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<RecipeForm>({
    mode: "onChange",
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: undefined,
      folders: [],
      ingredients: userIngredients.map((i) => ({
        ...i,
        ingredientId: i.id,
        ingredient: { name: i.name, isFlour: i.isFlour },
      })),
      recipeServing: {
        quantity: 1,
      },
    },
  });

  const {
    fields: selectedIngredients,
    remove: removeSelectedIngredient,
    append: appendSelectedIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: selectedFolders,
    remove: removeSelectedFolder,
    append: appendSelectedFolder,
  } = useFieldArray({
    control: form.control,
    name: "folders",
  });

  async function onSubmit(formData: RecipeForm) {
    startTransition(async () => {
      const result = await createRecipe(formData);

      if (result.errors) {
        Object.entries(result.errors).forEach(([path, message]) => {
          form.setError(path as FieldPath<RecipeForm>, {
            message: message.join("\n"),
          });
        });
      }
    });
  }

  return (
    <Form {...form}>
      {form.formState.errors.root?.message && (
        <Alert
          title={"Error"}
          variant={"destructive"}
          description={form.formState.errors.root?.message}
        />
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-around space-y-4 bg-white"
      >
        <Card>
          <CardHeader>
            <h3 className="mt-12 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
              Recipe info
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Type your recipe name here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipeServing.quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of servings</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the number of servings" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup className="max-h-40">
                        {getArrayFromOneTo(16).map((num, index) => (
                          <SelectItem key={index} value={`${num}`}>
                            <span className="pr-1">{num}</span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <FormLabel>Folders</FormLabel>
                  {selectedFolders.length === 0 ? (
                    <FormDescription>No folders connected.</FormDescription>
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      {selectedFolders.map((selectedFolder, index) => (
                        <Button
                          key={selectedFolder.id}
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => removeSelectedFolder(index)}
                        >
                          <Icons.folder className="mr-1 h-4 w-4" />
                          {selectedFolder.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={() => setSelectFoldersDialogOpen(true)}
                >
                  <Icons.add className="mr-2 h-4 w-4" />
                  Add folders
                </Button>
              </div>
              <Dialog
                open={selectFoldersDialogOpen}
                onOpenChange={setSelectFoldersDialogOpen}
              >
                <DialogContent className="gap-0 p-0 outline-none">
                  <DialogHeader className="px-4 pb-4 pt-5">
                    <DialogTitle>Select folders</DialogTitle>
                    <DialogDescription>
                      Select folder you would like to assign this recipe to.
                    </DialogDescription>
                  </DialogHeader>
                  <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
                    <CommandInput placeholder="Search folders..." />
                    <CommandList>
                      <CommandEmpty>No folders found.</CommandEmpty>
                      <CommandGroup className="p-2">
                        {userFolders.map((userFolder) => (
                          <CommandItem
                            key={userFolder.id}
                            className="flex items-center px-2"
                            onSelect={() => {
                              const selectedFolderIndex =
                                selectedFolders.findIndex(
                                  (selectedFolder) =>
                                    selectedFolder.name === userFolder.name,
                                );

                              if (selectedFolderIndex !== -1) {
                                removeSelectedFolder(selectedFolderIndex);
                                return;
                              }

                              appendSelectedFolder(userFolder);
                            }}
                          >
                            <div className="ml-2">
                              <p className="text-sm font-medium leading-none">
                                {userFolder.name}
                              </p>
                            </div>
                            {selectedFolders.find(
                              (selectedFolder) =>
                                selectedFolder.name === userFolder.name,
                            ) ? (
                              <Check className="ml-auto flex h-5 w-5 text-primary" />
                            ) : null}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                  <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                    <Button
                      // disabled={selectedFolders.length < 1}
                      type="button"
                      onClick={() => {
                        setSelectFoldersDialogOpen(false);
                      }}
                    >
                      Continue
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add notes about the recipe"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <>
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex flex-col flex-grow space-y-2">
                <h3 className="mt-12 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
                  Ingredients
                </h3>
                <FormField
                  control={form.control}
                  name={`ingredients.root`}
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedIngredients.map((ingredient, index) => (
                  <FormField
                    key={ingredient.id}
                    control={form.control}
                    name={`ingredients.${index}.weight`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ingredient.ingredient.name}</FormLabel>
                        <div className="flex space-x-2 justify-center items-center">
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="numeric"
                              placeholder={`Enter the amount of ${ingredient.ingredient.name.toLowerCase()}`}
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.replace(/[^0-9]/, ""),
                                )
                              }
                            />
                          </FormControl>
                          <Button
                            size={"icon"}
                            variant={"secondary"}
                            type="button"
                            onClick={() => removeSelectedIngredient(index)}
                          >
                            <Icons.trash />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => setSelectIngredientsDialogOpen(true)}
                >
                  <Icons.add className="mr-2 h-4 w-4" />
                  Add ingredient
                </Button>
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <Dialog
            open={selectIngredientsDialogOpen}
            onOpenChange={setSelectIngredientsDialogOpen}
          >
            <DialogContent className="gap-0 p-0 outline-none">
              <DialogHeader className="px-4 pb-4 pt-5">
                <DialogTitle>Select ingredients</DialogTitle>
                <DialogDescription>
                  Select ingredients for your recipe.
                </DialogDescription>
              </DialogHeader>
              <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
                <CommandInput placeholder="Search ingredients..." />
                <CommandList>
                  <CommandEmpty>No ingredients found.</CommandEmpty>
                  <CommandGroup className="p-2">
                    {userIngredients.map((userIngredient) => (
                      <CommandItem
                        key={userIngredient.id}
                        className="flex items-center px-2"
                        onSelect={() => {
                          const selectedIngredientIndex =
                            selectedIngredients.findIndex(
                              (selectedInredient) =>
                                selectedInredient.ingredient.name ===
                                userIngredient.name,
                            );

                          if (selectedIngredientIndex !== -1) {
                            removeSelectedIngredient(selectedIngredientIndex);
                            return;
                          }

                          appendSelectedIngredient({
                            ingredientId: userIngredient.id,
                            ingredient: {
                              name: userIngredient.name,
                              isFlour: userIngredient.isFlour,
                            },
                            weight: 0,
                          });
                        }}
                      >
                        <div className="ml-2">
                          <p className="text-sm font-medium leading-none">
                            {userIngredient.name}
                          </p>
                        </div>
                        {selectedIngredients.find(
                          ({ ingredient }) =>
                            ingredient.name === userIngredient.name,
                        ) ? (
                          <Check className="ml-auto flex h-5 w-5 text-primary" />
                        ) : null}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
              <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                <Button
                  type="button"
                  disabled={selectedIngredients.length < 1}
                  onClick={() => {
                    setSelectIngredientsDialogOpen(false);
                  }}
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
        <div className="flex justify-end space-x-4">
          <Button onClick={() => router.back()}>Cancel</Button>
          <SubmitButton type="submit" pending={pending}>
            Create recipe
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
