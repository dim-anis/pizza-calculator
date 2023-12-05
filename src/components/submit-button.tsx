import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { Loader } from "lucide-react";

type SubmitButtonProps = ButtonProps & { pending: boolean };

export default function SubmitButton({
  children,
  className,
  pending,
  ...props
}: SubmitButtonProps) {
  return (
    <Button className={cn(className)} disabled={pending} {...props}>
      {pending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}
