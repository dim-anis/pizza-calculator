const today = new Date();

export default function Footer() {
  return (
    <footer className="mt-5 flex flex-col items-center gap-4 py-8 text-xs text-slate-500">
      <p> &copy; {today.getFullYear()} Dmitry Anisov. All rights reserved.</p>
    </footer>
  );
}
