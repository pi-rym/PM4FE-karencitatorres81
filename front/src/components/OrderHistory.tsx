"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { getUserOrders, type Order } from "@/services/orders.service";

export default function OrderHistory() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      return;
    }

    let cancelled = false;

    const loadOrders = async () => {
      try {
        const data = await getUserOrders();

        if (!cancelled) {
          setOrders(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar las compras.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    // Ejecutar la consulta después del montaje
    const timeoutId = window.setTimeout(loadOrders, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [isAuthenticated, isLoading, user]);

  // No mostrar información sin sesión
  if (isLoading || !isAuthenticated || !user) {
    return null;
  }

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Mis compras</h2>

      <p className="mt-2 text-sm text-slate-500">
        Consulta el historial de tus compras realizadas.
      </p>

      {loading ? (
        <p className="mt-8 text-slate-600">Cargando compras...</p>
      ) : error ? (
        <div
          role="alert"
          className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700"
        >
          {error}
        </div>
      ) : orders.length === 0 ? (
        // Mensaje cuando no existen compras
        <div className="mt-8 rounded-xl bg-slate-50 p-10 text-center">
          <div className="mb-4 text-5xl">📦</div>

          <h3 className="text-xl font-bold text-slate-900">
            Todavía no has realizado ninguna compra
          </h3>

          <p className="mt-3 text-slate-600">
            Cuando realices tu primera compra, aparecerá aquí.
          </p>
        </div>
      ) : (
        // Historial de compras
        <div className="mt-8 space-y-6">
          {orders.map((order) => {
            const total = order.products.reduce(
              (sum, product) => sum + Number(product.price),
              0,
            );

            return (
              <article
                key={order.id}
                className="rounded-xl border border-slate-200 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Compra #{order.id}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Fecha: {new Date(order.date).toLocaleDateString("es-EC")}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                    {order.status === "approved" ? "Aprobada" : order.status}
                  </span>
                </div>

                <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <p className="text-slate-700">{product.name}</p>

                      <p className="font-semibold text-slate-900">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-between border-t border-slate-200 pt-5">
                  <span className="font-semibold text-slate-900">
                    Total de la compra
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
