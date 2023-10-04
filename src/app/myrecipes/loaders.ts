import "server-only";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getUserRecipes() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/api/auth/signin')
  }

  return await prisma.recipe.findMany({
    take: 10,
    skip: 0,
    where: {
      userId: user.id,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
    include: {
      folder: true
    },
  });
}
