export default function Cart() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Tu compra
        </span>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Carrito de compras
        </h1>

        <p className="mt-3 text-slate-600">
          Revisa los productos seleccionados antes de finalizar tu compra.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Tecnología
              </span>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                iPhone 11
              </h2>

              <p className="mt-2 text-sm text-slate-500">Cantidad: 1</p>
            </div>

            <p className="text-2xl font-bold text-slate-900">$699</p>
          </article>

          <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Accesorios
              </span>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                AirPods Pro
              </h2>

              <p className="mt-2 text-sm text-slate-500">Cantidad: 1</p>
            </div>

            <p className="text-2xl font-bold text-slate-900">$249</p>
          </article>
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Resumen de compra
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>$948</span>
            </div>

            <div className="flex justify-between text-sm text-slate-600">
              <span>Envío</span>
              <span>Gratis</span>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-slate-900">$948</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
            Finalizar compra
          </button>
        </aside>
      </div>
    </main>
  );
}
