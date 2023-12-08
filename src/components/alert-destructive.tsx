import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertProps = {
  description: string;
  className: string;
};

export function AlertDestructive({
  description,
  className,
  ...props
}: AlertProps) {
  return (
    <Alert variant="destructive" className={className} {...props}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
