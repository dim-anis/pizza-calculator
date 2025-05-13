"use client";
import { Icons } from "@/components/icons";
import SubmitButton from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTransition } from "react";

type Props = {
  href: string;
  itemId: number;
  itemType: "Ingredient" | "Folder" | "Recipe";
  title: string;
  tags: { title: string; href: string; icon: keyof typeof Icons }[];
  onDeleteAction: (id: number) => Promise<void>;
};

export default function ListItem({
  title,
  itemId,
  itemType,
  href,
  tags,
  onDeleteAction,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <li>
      <Link
        href={href}
        className="flex flex-col gap-2 rounded-xl border p-4 hover:bg-muted/50 bg-card text-card-foreground w-full h-full"
      >
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">{title}</h4>
          <div>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="xs">
                    <Icons.moreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`${href}/edit`}>
                      <Icons.folderEdit className="mr-2 h-4 w-4" />
                      <span>{`Edit ${itemType.toLowerCase()}`}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DialogTrigger>
                      <Icons.delete className="mr-2 h-4 w-4" />
                      <span>{`Delete ${itemType.toLowerCase()}`}</span>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{`Delete ${itemType.toLowerCase()}?`}</DialogTitle>
                    <DialogDescription>
                      {`Are you sure you want to permanently delete ${title}?`}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <form
                      className="inline-flex"
                      onSubmit={(e) => {
                        e.preventDefault();
                        startTransition(() => {
                          onDeleteAction(itemId);
                        });
                      }}
                    >
                      <SubmitButton
                        type="submit"
                        pending={pending}
                        variant="destructive"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {`Delete ${itemType.toLowerCase()}`}
                      </SubmitButton>
                    </form>
                  </DialogFooter>
                </DialogContent>
              </DropdownMenu>
            </Dialog>
          </div>
        </div>
        <div className="space-x-2 flex flex-wrap">
          {tags.map((tag, idx) => {
            const Icon = Icons[tag.icon];
            return (
              <Badge
                key={idx}
                variant="outline"
                className="border-none p-0 hover:underline decoration-muted-foreground"
              >
                {Icon ? <Icon className="text-muted-foreground" /> : null}
                <p className="text-muted-foreground">{tag.title}</p>
              </Badge>
            );
          })}
        </div>
      </Link>
    </li>
  );
}
