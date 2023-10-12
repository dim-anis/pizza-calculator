import { Recipe } from "@prisma/client";
import RecipeItem from "./RecipeItem";
import RecipeList from "./RecipeList";
import { FolderEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type RecipeSectionProps = {
  currFolder: {
    name: string;
    contents: Recipe[];
  };
};

export default function RecipeSection(props: RecipeSectionProps) {
  const {
    currFolder: { name: folderName, contents: folderContents },
  } = props;
  const numOfRecipes = folderContents.length;
  const isEmptyFolder = numOfRecipes === 0;

  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="flex gap-1">
        {folderName !== "all" ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
              >
                <FolderEdit />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change name</DialogTitle>
                <DialogDescription>
                  Enter new folder&apos;s name. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="folderName" className="text-right">
                    New name
                  </Label>
                  <Input
                    id="folderName"
                    value="Folder name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="destructive">Delete folder</Button>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}
        <h2 className="mb-4 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900">
          {`${folderName} (${numOfRecipes})`}
        </h2>
      </div>
      {isEmptyFolder ? (
        <p>You don&apos;t have any saved recipes yet. Get cooking!</p>
      ) : (
        <RecipeList>
          {folderContents.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              name={recipe.name}
              desc={"short description..."}
            />
          ))}
        </RecipeList>
      )}
    </div>
  );
}
