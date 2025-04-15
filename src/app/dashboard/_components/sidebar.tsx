import { getFolderNamesWithRecipeCount } from "@/lib/queries";
import FolderList from "./folder-list";
import SidebarNav from "./sidebar-nav";

export default async function SideBar() {
  const [foldersWithCount] = await getFolderNamesWithRecipeCount();
  return (
    <div className="space-y-6">
      <SidebarNav />
      <FolderList folders={foldersWithCount} />
    </div>
  );
}
