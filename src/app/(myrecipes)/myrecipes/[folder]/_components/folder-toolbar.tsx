"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FolderEdit, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
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
import { useTransition } from "react";
import SubmitButton from "@/components/submit-button";

export default function FolderTitleToolbar({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex items-center space-x-2">
      <Link
        className={`${buttonVariants({
          variant: "default",
        })} inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
        href={`/myrecipes/${folderName}/new-recipe`}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add recipe
      </Link>
      {folderName !== "all" && (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="secondary" size="icon">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/myrecipes/${folderName}/edit`}>
                  <FolderEdit className="mr-2 h-4 w-4" />
                  <span>Edit folder</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DialogTrigger>
                  <Trash2 className="mr-2 h-4 w-4" />
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
                <SubmitButton
                  variant="destructive"
                  pending={pending}
                  onClick={async () =>
                    startTransition(async () => {
                      await deleteFolder(folderId);
                    })
                  }
                >
                  Delete folder
                </SubmitButton>
              </DialogFooter>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      )}
    </div>
  );
}
