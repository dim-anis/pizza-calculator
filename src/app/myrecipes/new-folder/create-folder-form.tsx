"use client";

import { createFolder } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, useForm } from "react-hook-form";
import { CreateFolder, createFolderSchema } from "@/lib/types";
import { Alert } from "@/components/alert-destructive";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import SubmitButton from "@/components/submit-button";

export default function CreateFolderForm() {
  const [pending, startTransition] = useTransition();
  const form = useForm<CreateFolder>({
    mode: "onChange",
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleSubmit(data: CreateFolder) {
    startTransition(async () => {
      const result = await createFolder(data);

      if (result.errors) {
        Object.entries(result.errors).forEach(([path, message]) => {
          form.setError(path as FieldPath<CreateFolder>, {
            message: message.join("\n"),
          });
        });
      }
    });
  }
  return (
    <Form {...form}>
      {form.formState.errors.root?.message && (
        <Alert
          title={"Error"}
          variant={"destructive"}
          description={form.formState.errors.root?.message}
        />
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
                  placeholder="Type your folder name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton type="submit" pending={pending}>
          Create folder
        </SubmitButton>
      </form>
    </Form>
  );
}
