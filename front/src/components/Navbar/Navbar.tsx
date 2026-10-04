import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
          NovaStore
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/home"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Inicio
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Mi cuenta
          </Link>

          <Link
            href="/cart"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Carrito
          </Link>
        </nav>
      </div>
    </header>
  );
}
