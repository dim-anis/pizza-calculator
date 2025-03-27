import {
  Alert as AlertCN,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "@/components/ui/alert";
import { Icons } from "./icons";
import { VariantProps } from "class-variance-authority";

type AlertProps = React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    title: string;
    description: string;
  };

export function Alert({ description, title, variant, ...props }: AlertProps) {
  return (
    <AlertCN variant={variant} {...props} className="border-destructive">
      {variant === "destructive" ? (
        <Icons.alert className="h-4 w-4" />
      ) : (
        <Icons.success className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </AlertCN>
  );
}
