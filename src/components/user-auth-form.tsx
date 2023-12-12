"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Github, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg
              role="img"
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Google</title>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          Github
        </Button>
      </div>
    </>
  );
}
