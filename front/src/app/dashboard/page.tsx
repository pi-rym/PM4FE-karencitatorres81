"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import OrderHistory from "@/components/OrderHistory";

export default function DashboardPage() {
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAuth();

  // Proteger el Dashboard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Esperar mientras se comprueba la sesión
  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-center text-slate-600">
          Cargando información del usuario...
        </p>
      </main>
    );
  }

  // No mostrar información sin sesión
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
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
          {/* Nombre */}
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Nombre completo
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user.name}
            </p>
          </div>

          {/* Correo */}
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Correo electrónico
            </p>

            <p className="mt-2 break-all text-lg font-semibold text-slate-900">
              {user.email}
            </p>
          </div>

          {/* ID */}
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">ID de usuario</p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user.id}
            </p>
          </div>

          {/* Estado */}
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
