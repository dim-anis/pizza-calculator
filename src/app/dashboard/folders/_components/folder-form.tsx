"use client";

import { createOrUpdateFolder } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldPath, useForm } from "react-hook-form";
import { type FolderForm, folderFormSchema } from "@/lib/types";
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

type Props = {
  defaultValues?: DefaultValues<FolderForm>;
};

export default function FolderForm({ defaultValues }: Props) {
  const [pending, startTransition] = useTransition();
  const form = useForm<FolderForm>({
    mode: "onChange",
    resolver: zodResolver(folderFormSchema),
    ...(defaultValues ? { defaultValues } : { defaultValues: { name: "" } }),
  });

  async function handleSubmit(data: FolderForm) {
    startTransition(async () => {
      const result = await createOrUpdateFolder(data);

      if (result.errors) {
        Object.entries(result.errors).forEach(([path, message]) => {
          form.setError(path as FieldPath<FolderForm>, {
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
          {`${defaultValues ? "Update" : "Create"} folder`}
        </SubmitButton>
      </form>
    </Form>
  );
}
