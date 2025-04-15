type Props = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  isActive: boolean;
};

export default function SideBarItem({ title, right, left, isActive }: Props) {
  return (
    <li
      className={`${
        isActive
          ? "bg-muted hover:bg-muted font-medium"
          : "bg-transparent hover:bg-muted"
      } inline-flex h-9 w-full items-center justify-between rounded-md bg-muted px-4 py-2 text-sm transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
    >
      <div className="flex flex-row truncate items-center">
        {left && <div>{left}</div>}
        <span className="truncate">{title}</span>
      </div>
      {right && <div className="ml-2">{right}</div>}
    </li>
  );
}
