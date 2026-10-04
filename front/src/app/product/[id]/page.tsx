interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Producto #{id}</p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Detalle del producto
        </h1>
      </div>

      <section className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-xl bg-slate-100">
          <span className="text-lg font-medium text-slate-400">
            Imagen del producto
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Tecnología
          </span>

          <h2 className="text-3xl font-bold text-slate-900">
            Nombre del producto
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Aquí se mostrará la descripción completa del producto seleccionado.
          </p>

          <p className="mt-8 text-3xl font-bold text-slate-900">$0</p>

          <p className="mt-2 text-sm font-medium text-green-600">
            Stock disponible: 0
          </p>

          <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            Agregar al carrito
          </button>
        </div>
      </section>
    </main>
  );
}
