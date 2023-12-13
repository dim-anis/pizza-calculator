import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "./icons";

type AlertProps = {
  description: string;
};

export function AlertDestructive({ description, ...props }: AlertProps) {
  return (
    <Alert variant="destructive" {...props}>
      <Icons.alert className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
