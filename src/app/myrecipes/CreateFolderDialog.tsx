"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const FormSchema = z.object({
  folderName: z.string().min(2, {
    message: "Folder name be at least 2 characters.",
  }),
});

export type FormData = z.infer<typeof FormSchema>;

export function CreateFolderDialog() {
  const [open, setOpen] = useState(false);
  const session = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      folderName: "",
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function onSubmit({ folderName }: FormData) {
    const response = await fetch("/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        userId: session.data?.user.id,
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
        <Button variant="outline">Create new folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new folder</DialogTitle>
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
            <Button type="submit" disabled={isPending}>
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
