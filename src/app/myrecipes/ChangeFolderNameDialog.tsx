import { FolderEdit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RecipeFolder } from "./SavedRecipesSection";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
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
import { deleteFolder, updateFolder } from "@/lib/actions";

type ChangeFolderNameDialogProps = {
  currFolder: RecipeFolder | undefined;
};

const FormSchema = z.object({
  folderName: z.string().min(1, "Name is required.").max(25),
});

export type FormData = z.infer<typeof FormSchema>;

export default function ChangeFolderNameDialog({
  currFolder,
}: ChangeFolderNameDialogProps) {
  const [open, setOpen] = useState(false);
  const [updatePending, startUpdateTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      folderName: currFolder?.name,
    },
  });

  useEffect(() => {
    form.reset({
      folderName: currFolder?.name,
    });
  }, [currFolder?.name, form]);

  async function onSubmit({ folderName }: FormData) {
    startUpdateTransition(async () => {
      await updateFolder({ name: folderName, id: currFolder.id });
      setOpen(false);
    });
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
          <DialogTitle>Edit folder</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="update"
          >
            <FormField
              control={form.control}
              name="folderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder name</FormLabel>
                  <FormControl>
                    <Input placeholder="Folder name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter new name. Click save when you&apos;re done.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="update" disabled={updatePending}>
            {updatePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deletePending}
            onClick={async () => {
              startDeleteTransition(async () => {
                await deleteFolder({ id: currFolder.id });
                setOpen(false);
              });
            }}
          >
            {deletePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting folder
              </>
            ) : (
              "Delete folder"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
