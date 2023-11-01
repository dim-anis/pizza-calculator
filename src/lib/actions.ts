"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { getCurrentUser } from "./session";
import { z } from "zod";

const FolderSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  userId: z.string(),
});

const CreateFolder = FolderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export async function createFolder(data: z.infer<typeof CreateFolder>) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = CreateFolder.safeParse(data);

  if (!zodResult.success) {
    const { error } = zodResult;
    return error;
  }

  const {
    data: { name },
  } = zodResult;

  try {
    const newFolder = await prisma.folder.create({
      data: {
        userId: user.id,
        name,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Folder",
    };
  }

  revalidatePath("/myrecipes");
}

const UpdateFolder = FolderSchema.pick({
  id: true,
  name: true,
});

export async function updateFolder(data: z.infer<typeof UpdateFolder>) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = UpdateFolder.safeParse(data);

  if (!zodResult.success) {
    const { error } = zodResult;
    return { success: false, error: error.format() };
  }

  const {
    data: { id: folderId, name: newName },
  } = zodResult;

  try {
    const updatedFolder = await prisma.folder.update({
      where: {
        id: folderId,
        userId: user.id,
      },
      data: {
        name: newName,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Folder",
    };
  }

  revalidatePath("/myrecipes");
}

const DeleteFolder = FolderSchema.pick({
  id: true,
});
export async function deleteFolder(data: z.infer<typeof DeleteFolder>) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = DeleteFolder.safeParse(data);

  if (!zodResult.success) {
    const { error } = zodResult;
    return { success: false, error: error.format() };
  }

  const {
    data: { id },
  } = zodResult;

  const deletedFolder = await prisma.folder.delete({
    where: {
      id,
      userId: user?.id,
    },
  });

  revalidatePath("/myrecipes");
}
