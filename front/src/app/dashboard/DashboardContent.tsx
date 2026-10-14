"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import OrderHistory from "@/components/OrderHistory";

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, isAuthenticated, isLoading } = useAuth();

  // Obtener el número de compra desde la URL
  const orderSuccess = searchParams.get("orderSuccess");

  // Proteger el Dashboard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-center text-slate-600">
          Cargando información del usuario...
        </p>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Mensaje de compra exitosa */}
      {orderSuccess && (
        <div
          role="status"
          className="mb-10 rounded-2xl border border-green-200 bg-green-50 p-6"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">✅</span>

            <div>
              <h2 className="text-xl font-bold text-green-800">
                ¡Compra realizada con éxito!
              </h2>

              <p className="mt-2 text-green-700">
                Tu pedido #{orderSuccess} se registró correctamente.
              </p>

              <p className="mt-2 text-sm text-green-700">
                Puedes consultar los detalles de tu compra en el historial que
                aparece más abajo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Encabezado */}
      <div className="mb-10">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Mi cuenta
        </span>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Bienvenido, {user.name}
        </h1>

        <p className="mt-3 text-slate-600">
          Consulta la información de tu cuenta y tus compras realizadas en
          NovaStore.
        </p>
      </div>

      {/* Información personal */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Información personal
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Datos obtenidos durante el inicio de sesión.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Nombre completo
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user.name}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Correo electrónico
            </p>

            <p className="mt-2 break-all text-lg font-semibold text-slate-900">
              {user.email}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">ID de usuario</p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user.id}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Estado de la sesión
            </p>

            <p className="mt-2 text-lg font-semibold text-green-600">
              Sesión iniciada
            </p>
          </div>
        </div>
      </section>

      {/* Historial de compras */}
      <OrderHistory />
    </main>
  );
}
