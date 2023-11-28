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
import { createFolder } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateFolder, CreateFolderSchema } from "./definitions";

export default function CreateFolderPage() {
  const form = useForm<CreateFolder>({
    mode: "onChange",
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleSubmit(data: CreateFolder) {
    await createFolder(data);
  }

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Create a folder
      </h2>
      <div
        data-orientation="horizontal"
        role="none"
        className="h-[1px] w-full shrink-0 bg-border"
      ></div>
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
                    placeholder="Type your folder name here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create folder</Button>
        </form>
      </Form>
    </>
  );
}
