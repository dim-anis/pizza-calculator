"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, PenSquare, Trash2 } from "lucide-react";
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

type Params = {
  folder: string;
  id: string;
};

export function Toolbar() {
  const params: Params = useParams();
  return (
    <div className="flex w-full gap-5">
      <Link
        href={`/myrecipes/${params.folder}`}
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>
      <div className="flex">
        <Link
          href={`/myrecipes/${params.folder}/new`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <PenSquare className="h-5 w-5" />
        </Link>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost" size="icon" onClick={() => console.log()}>
              <Trash2 className="h-5 w-5" />
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  await deleteRecipe(params.folder, params.id);
                }}
              >
                <Button type="submit" variant="destructive">
                  Delete recipe
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
