import NavMenu from "./NavMenu";
import UserDropdown from "./UserDropdown";

export default function MainNav() {
  return (
    <div className="flex h-20 items-center justify-between py-6">
      <NavMenu />
      <UserDropdown />
    </div>
  );
}
