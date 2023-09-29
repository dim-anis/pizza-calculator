'use client'
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Avatar>
        <AvatarImage src={session.user?.image || undefined} />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
  }

  return <Button onClick={() => signIn()}>Sign in</Button>
}
