import { FolderEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RecipeFolder } from "./SavedRecipesSection";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";

type ChangeFolderNameDialogProps = {
  currFolder: RecipeFolder | null;
};

const FormSchema = z.object({
  folderName: z.string().min(2, {
    message: "Folder name be at least 2 characters.",
  }),
});

export type FormData = z.infer<typeof FormSchema>;

export default function ChangeFolderNameDialog({
  currFolder,
}: ChangeFolderNameDialogProps) {
  const [open, setOpen] = useState(false);
  const session = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      folderName: currFolder?.name,
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function onSubmit({ folderName }: FormData) {
    const response = await fetch("/api/folders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: folderName,
        userId: session.data?.user.id,
        folderId: currFolder?.id,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    setOpen(false);
    startTransition(() => {
      router.refresh();
    });

    return await response.json();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FolderEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change folder name</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="folderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New name</FormLabel>
                  <FormControl>
                    <Input placeholder="Folder name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter new folder&apos;s name. Click save when you&apos;re
                    done.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2 justify-end">
              <Button
                variant="destructive"
                type="submit"
                name="delete"
                disabled={isPending}
              >
                Delete folder
              </Button>
              <Button type="submit" name="update" disabled={isPending}>
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
