export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Mi cuenta
        </span>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Dashboard de usuario
        </h1>

        <p className="mt-3 text-slate-600">
          Consulta tu información personal y el estado de tus pedidos.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Información del usuario
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-medium text-slate-500">Nombre</p>
              <p className="mt-1 font-semibold text-slate-900">
                Usuario NovaStore
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Correo electrónico
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                usuario@novastore.com
              </p>
            </div>
          </div>
        </section>

        <section className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900">Mis pedidos</h2>

          <div className="mt-6 space-y-4">
            <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Pedido #001</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Total de la compra
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">$699</p>
              </div>

              <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Entregado
              </span>
            </article>

            <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Pedido #002</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Total de la compra
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">$249</p>
              </div>

              <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                En proceso
              </span>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
