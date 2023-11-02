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
  name: true,
});

const UpdateFolderWithOldName = UpdateFolder.extend({
  oldName: z.string(),
});

export async function updateFolder(
  data: z.infer<typeof UpdateFolderWithOldName>,
) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = UpdateFolderWithOldName.safeParse(data);

  if (!zodResult.success) {
    const { error } = zodResult;
    return { success: false, error: error.format() };
  }

  const {
    data: { oldName, name: newName },
  } = zodResult;

  try {
    const updatedFolder = await prisma.folder.update({
      where: {
        name: oldName,
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
  name: true,
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
    data: { name },
  } = zodResult;

  const deletedFolder = await prisma.folder.delete({
    where: {
      name,
      userId: user?.id,
    },
  });

  revalidatePath("/myrecipes");
}