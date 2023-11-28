import { z } from "zod";

export const CreateFolderSchema = z.object({
  name: z.coerce.string().min(1, { message: "Folder name is required." }),
});

export type CreateFolder = z.infer<typeof CreateFolderSchema>;
