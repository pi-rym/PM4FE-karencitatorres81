import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            NovaStore
          </span>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Iniciar sesión
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Ingresa tus datos para acceder a tu cuenta.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
