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
import { CreateFolder, CreateFolderSchema } from "../../new-folder/definitions";
import { useTransition } from "react";
import SubmitButton from "@/components/submit-button";

export default function EditFolderForm({
  oldFolderName,
}: {
  oldFolderName: string;
}) {
  const [pending, startTransition] = useTransition();
  const form = useForm<CreateFolder>({
    mode: "onChange",
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: oldFolderName,
    },
  });

  async function handleSubmit(folderData: CreateFolder) {
    startTransition(async () => {
      await updateFolder(oldFolderName, folderData);
    });
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
        <SubmitButton type="submit" pending={pending}>
          Update folder
        </SubmitButton>
      </form>
    </Form>
  );
}
