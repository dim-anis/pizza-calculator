import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      formAction="delete"
      variant="destructive"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting
        </div>
      ) : (
        <span>Delete</span>
      )}
    </Button>
  );
}
