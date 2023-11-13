import { Button } from "@/components/ui/button";

export default function FolderEmptyView() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-5 text-current">
      <p>No recipes found in this folder.</p>
      <Button>Add recipe</Button>
    </div>
  );
}
