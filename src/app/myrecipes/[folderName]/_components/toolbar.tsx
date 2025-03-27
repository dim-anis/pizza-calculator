"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteRecipe } from "@/lib/actions";
import SubmitButton from "@/components/submit-button";
import { FormEvent, useTransition } from "react";
import { Icons } from "@/components/icons";

type Params = {
  folderName: string;
  recipeId: string;
};

export function RecipeToolbar() {
  const [pending, startTransition] = useTransition();
  const params: Params = useParams();

  const router = useRouter();

  async function handleDeleteRecipe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      await deleteRecipe(params.recipeId);
    });
  }

  return (
    <div className="flex w-full gap-5">
      <Button variant={"ghost"} size={"icon"} onClick={router.back}>
        <Icons.chevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex">
        <Link
          href={`/myrecipes/${params.folderName}/${params.recipeId}/edit`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.recipeEdit className="h-5 w-5" />
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.trash className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                recipe.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <form
                className="inline-flex"
                onSubmit={async (e) => handleDeleteRecipe(e)}
              >
                <SubmitButton
                  type="submit"
                  pending={pending}
                  variant="destructive"
                >
                  Delete recipe
                </SubmitButton>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
