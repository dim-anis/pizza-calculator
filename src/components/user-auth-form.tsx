"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Icons } from "./icons";

export default function UserAuthForm() {
  const [isLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  return (
    <>
      <Input disabled />
      <Button className={cn(buttonVariants())} disabled>
        {isLoading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
        Sign In with Email
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          type="button"
          className={`${buttonVariants({ variant: "outline" })} text-current`}
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google", { callbackUrl: from });
          }}
          disabled={isLoading || isGithubLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button
          type="button"
          className={`${buttonVariants({ variant: "outline" })} text-current`}
          onClick={() => {
            setIsGithubLoading(true);
            signIn("github", { callbackUrl: from });
          }}
          disabled={isLoading || isGithubLoading || isGoogleLoading}
        >
          {isGithubLoading ? (
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.github className="mr-2 h-4 w-4" />
          )}
          Github
        </Button>
      </div>
    </>
  );
}
