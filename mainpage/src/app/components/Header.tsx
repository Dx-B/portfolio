import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
        <div className="text-lg font-semibold">Billy Zhang</div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="#about" className="hover:text-blue-300 transition">
            About
          </Link>
          <Link href="#projects" className="hover:text-blue-300 transition">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-blue-300 transition">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
