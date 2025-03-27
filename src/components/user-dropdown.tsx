"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function UserDropdown() {
  const { data: session } = useSession();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={session.user?.image || undefined} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              {session.user?.email && (
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user?.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/myrecipes" passHref>
              My recipes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}` })
            }
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <Button onClick={() => signIn()}>Log in</Button>;
}
