import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button onClick={() => signOut()}>Sign out</Button>
    )
  }

  return <Button onClick={() => signIn()}>Sign in</Button>
}
