"use client";

import { createFolder } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, useForm } from "react-hook-form";
import { CreateFolder, CreateFolderSchema } from "./definitions";
import { ActionState } from "@/lib/definitions";
import { AlertDestructive } from "@/components/alert-destructive";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import SubmitButton from "@/components/submit-button";

export default function CreateFolderForm() {
  const [uncaughtError, setUncaughtError] = useState<ActionState>(null);
  const [pending, startTransition] = useTransition();
  const form = useForm<CreateFolder>({
    mode: "onChange",
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleSubmit(data: CreateFolder) {
    startTransition(async () => {
      const result = await createFolder(data);

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
