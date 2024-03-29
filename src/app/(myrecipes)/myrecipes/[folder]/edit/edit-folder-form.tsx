"use client";

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
import { FieldPath, useForm } from "react-hook-form";
import { CreateFolder, CreateFolderSchema } from "../../new-folder/definitions";
import { useState, useTransition } from "react";
import SubmitButton from "@/components/submit-button";
import { ActionState } from "@/lib/definitions";
import { AlertDestructive } from "@/components/alert-destructive";

export default function EditFolderForm({
  oldFolderName,
}: {
  oldFolderName: string;
}) {
  const [uncaughtError, setUncaughtError] = useState<ActionState>(null);
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
      const result = await updateFolder(oldFolderName, folderData);

      if (result?.status === "error") {
        if (
          result.message === "invalid form data" ||
          result.message === "duplicate key"
        ) {
          result.errors?.forEach((error) => {
            form.setError(error.path as FieldPath<CreateFolder>, {
              message: error.message,
            });
          });
        } else {
          setUncaughtError(result);
        }
      }
    });
  }

  return (
    <Form {...form}>
      {uncaughtError && (
        <AlertDestructive description={uncaughtError.message} />
      )}
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
