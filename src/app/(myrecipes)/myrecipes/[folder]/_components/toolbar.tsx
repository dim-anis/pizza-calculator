"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { FormEvent, useState, useTransition } from "react";
import { ActionState } from "@/lib/definitions";
import { AlertDestructive } from "@/components/alert-destructive";
import { Icons } from "@/components/icons";

type Params = {
  folder: string;
  id: string;
};

export function Toolbar() {
  const [uncaughtError, setUncaughtError] = useState<ActionState>(null);
  const [pending, startTransition] = useTransition();
  const params: Params = useParams();

  async function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await deleteRecipe(params.folder, params.id);
      if (result?.status === "error") {
        setUncaughtError(result);
      }
    });
  }

  return (
    <div className="flex w-full gap-5">
      <Link
        href={`/myrecipes/${params.folder}`}
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        <Icons.chevronLeft className="h-5 w-5" />
      </Link>
      <div className="flex">
        <Link
          href={`/myrecipes/${params.folder}/${params.id}/edit`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.recipeEdit className="h-5 w-5" />
        </Link>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost" size="icon" onClick={() => console.log()}>
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
              {uncaughtError && (
                <AlertDestructive description={uncaughtError.message} />
              )}
            </DialogHeader>
            <DialogFooter>
              <form
                className="inline-flex"
                onSubmit={async (e) => handleDelete(e)}
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
