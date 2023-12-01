type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: AuthLayoutProps) {
  return <div className="min-h-screen">{children}</div>;
}
