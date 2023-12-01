import NavMenu from "./nav-menu";
import UserDropdown from "./user-dropdown";

export default function MainNav() {
  return (
    <div className="flex h-20 items-center justify-between py-6">
      <NavMenu />
      <UserDropdown />
    </div>
  );
}
