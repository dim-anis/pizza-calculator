"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateFolder } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateFolder,
  CreateFolderSchema,
} from "@/app/myrecipes/new-folder/definitions";

export default function EditRecipeForm({
  oldFolderName,
}: {
  oldFolderName: string;
}) {
  const form = useForm<CreateFolder>({
    mode: "onChange",
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: oldFolderName,
    },
  });

  async function handleSubmit(folderData: CreateFolder) {
    await updateFolder(oldFolderName, folderData);
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Folder name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your new folder name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update folder</Button>
      </form>
    </Form>
  );
}
