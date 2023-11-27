type BlogLayoutProps = { children: React.ReactNode };

export default function Layout({ children }: BlogLayoutProps) {
  return <div className="mx-auto max-w-5xl">{children}</div>;
}
