import Link from "next/link";

export default function Landing() {
  return (
    <main>
      <section>
        <h1>NovaStore</h1>

        <h2>Todo lo que necesitas en un solo lugar</h2>

        <p>
          Descubre nuestra selección de productos y encuentra lo que estás
          buscando.
        </p>

        <Link href="/home">Ingresar a la tienda</Link>
      </section>
    </main>
  );
}