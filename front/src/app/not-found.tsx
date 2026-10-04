import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
      <section className="max-w-xl text-center">
        <p className="text-7xl font-bold text-blue-600">404</p>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
          Página no encontrada
        </h1>

        <p className="mt-4 text-lg leading-7 text-slate-600">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>

        <Link
          href="/home"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
