import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section>
        <h1>404 - Página no encontrada</h1>

        <p>
          Lo sentimos, la página que estás buscando no existe.
        </p>

        <Link href="/home">Volver al inicio</Link>
      </section>
    </main>
  );
}