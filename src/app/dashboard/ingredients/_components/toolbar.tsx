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
import { deleteIngredient } from "@/lib/actions";
import SubmitButton from "@/components/submit-button";
import { FormEvent, useTransition } from "react";
import { Icons } from "@/components/icons";

type Params = {
  ingredientId: string;
};

export function IngredientToolbar() {
  const [pending, startTransition] = useTransition();
  const params: Params = useParams();

  const router = useRouter();

  async function handleDeleteIngredient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      await deleteIngredient(Number(params.ingredientId));
    });
  }

  return (
    <div className="flex w-full gap-5">
      <Button variant={"ghost"} size={"icon"} onClick={router.back}>
        <Icons.back className="h-5 w-5" />
      </Button>
      <div className="flex">
        <Link
          href={`/dashboard/ingredients/${params.ingredientId}/edit`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.edit className="h-5 w-5" />
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.delete className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                ingredient.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <form
                className="inline-flex"
                onSubmit={async (e) => handleDeleteIngredient(e)}
              >
                <SubmitButton
                  type="submit"
                  pending={pending}
                  variant="destructive"
                >
                  Delete
                </SubmitButton>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
