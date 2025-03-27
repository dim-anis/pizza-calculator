"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteFolder } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FormEvent, useTransition } from "react";
import SubmitButton from "@/components/submit-button";
import { Icons } from "@/components/icons";

export default function FolderTitleToolbar({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: string;
}) {
  const [pending, startTransition] = useTransition();
  async function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await deleteFolder(folderId);
    });
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        className={`${buttonVariants({
          variant: "default",
        })} inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
        href={`/myrecipes/${folderName}/new-recipe`}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add recipe
      </Link>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <Icons.more />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/myrecipes/${folderName}/edit`}>
                <Icons.folderEdit className="mr-2 h-4 w-4" />
                <span>Edit folder</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DialogTrigger>
                <Icons.trash className="mr-2 h-4 w-4" />
                <span>Delete folder</span>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this folder?
              </DialogDescription>
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
                  Delete folder
                </SubmitButton>
              </form>
            </DialogFooter>
          </DialogContent>
        </DropdownMenu>
      </Dialog>
    </div>
  );
}
