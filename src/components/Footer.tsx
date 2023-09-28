const today = new Date();

export default function Footer() {
  return (
    <footer className="flex flex-col mt-5 gap-4 items-center pt-8 pb-8 text-slate-500 text-sm">
      <p> &copy; {today.getFullYear()} Dmitry Anisov. All rights reserved.</p>
    </footer>
  );
}
