interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetail({
  params,
}: ProductDetailProps) {
  const { id } = await params;

  return (
    <main>
      <h1>Detalle del producto</h1>

      <p>ID del producto: {id}</p>

      <section>
        <h2>Nombre del producto</h2>
        <p>Descripción del producto.</p>
        <p>Precio: $0</p>
        <p>Stock disponible: 0</p>

        <button>Agregar al carrito</button>
      </section>
    </main>
  );
}