"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Github, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  return (
    <>
      <Input disabled />
      <Button className={cn(buttonVariants())} disabled>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
      <Button
        type="button"
        className={`${buttonVariants({ variant: "outline" })} text-current`}
        onClick={() => {
          setIsGithubLoading(true);
          signIn("github", { callbackUrl: "/" });
        }}
        disabled={isLoading || isGithubLoading}
      >
        {isGithubLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
    </>
  );
}
