type FAQLayoutProps = { children: React.ReactNode };

export default function Layout({ children }: FAQLayoutProps) {
  return <div className="mx-auto max-w-5xl">{children}</div>;
}
