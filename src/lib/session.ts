import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
