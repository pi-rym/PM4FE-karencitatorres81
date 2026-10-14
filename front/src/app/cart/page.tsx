"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orders.service";

export default function Cart() {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();

  const { cart, removeFromCart, clearCart, total, totalItems } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Proteger el carrito de usuarios sin sesión
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Registrar la compra
  const handleCheckout = async () => {
    if (isProcessing || cart.length === 0) {
      return;
    }

    setError("");

    // Solo permitimos una unidad por producto
    const hasMultipleUnits = cart.some((product) => product.quantity !== 1);

    if (hasMultipleUnits) {
      setError(
        "Por ahora solo puedes comprar una unidad de cada producto. Elimina los productos con cantidades mayores a 1 y agrégalos nuevamente.",
      );
      return;
    }

    try {
      setIsProcessing(true);

      // Obtener los IDs de los productos seleccionados
      const productIds = cart.map((product) => product.id);

      // Enviar la compra al backend
      const order = await createOrder(productIds);

      // Vaciar el carrito solo si la compra fue exitosa
      clearCart();

      // Redirigir al Dashboard con el ID de la compra
      router.push(`/dashboard?orderSuccess=${order.id}`);
    } catch (err) {
      // Mostrar un mensaje comprensible si falla la conexión
      if (err instanceof TypeError) {
        setError(
          "No pudimos conectar con el servidor. Tu compra no se completó. Inténtalo nuevamente más tarde.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al finalizar la compra.",
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-center text-slate-600">Verificando sesión...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      {/* Encabezado */}
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

      {cart.length === 0 ? (
        // Carrito vacío
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Tu carrito está vacío
          </h2>

          <p className="mt-3 text-slate-600">
            Todavía no has agregado productos.
          </p>

          <button
            type="button"
            onClick={() => router.push("/home")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Explorar productos
          </button>
        </div>
      ) : (
        // Carrito con productos
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Listado de productos */}
          <section className="space-y-4 lg:col-span-2">
            {cart.map((product) => (
              <article
                key={product.id}
                className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Tecnología
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Cantidad: {product.quantity}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Precio unitario: ${Number(product.price).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => {
                      setError("");
                      removeFromCart(product.id);
                    }}
                    className="mt-4 text-sm font-semibold text-red-600 transition hover:text-red-700 disabled:opacity-50"
                  >
                    Eliminar producto
                  </button>
                </div>

                <p className="text-2xl font-bold text-slate-900">
                  ${(Number(product.price) * product.quantity).toFixed(2)}
                </p>
              </article>
            ))}
          </section>

          {/* Resumen de compra */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Resumen de compra
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Productos</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Envío</span>
                <span>Gratis</span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Total</span>

                  <span className="text-2xl font-bold text-slate-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Vaciar carrito */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => {
                setError("");
                clearCart();
              }}
              className="mt-6 w-full rounded-xl border border-red-300 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              Vaciar carrito
            </button>

            {/* Finalizar compra */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isProcessing}
              className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? "Procesando compra..." : "Finalizar compra"}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
