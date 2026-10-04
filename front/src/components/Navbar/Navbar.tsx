import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <h1>NovaStore</h1>

      <nav>
        <Link href="/">Landing</Link>
        <Link href="/home">Inicio</Link>
        <Link href="/dashboard">Mi cuenta</Link>
        <Link href="/cart">Carrito</Link>
      </nav>
    </header>
  );
}