import Link from "next/link";

export default function Landing() {
  return (
    <main>
      <section className="mx-auto flex min-h-[75vh] max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Bienvenido a NovaStore
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Tecnología para tu día a día.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Descubre nuestra selección de productos tecnológicos y encuentra
            todo lo que necesitas en un solo lugar.
          </p>

          <div className="mt-8">
            <Link
              href="/home"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Explorar productos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
