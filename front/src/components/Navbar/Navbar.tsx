"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();

  // Contexto de autenticación
  const { isAuthenticated, isLoading, logout } = useAuth();

  // Contexto del carrito de compras
  const { clearCart, totalItems } = useCart();

  // Cerrar sesión y vaciar el carrito
  const handleLogout = () => {
    clearCart();
    logout();
    router.push("/home");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          NovaStore
        </Link>

        {/* Enlaces de navegación */}
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/home"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Inicio
          </Link>

          {/* Mostrar opciones según autenticación */}
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Mi cuenta
                  </Link>

                  <Link
                    href="/cart"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Carrito ({totalItems})
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Iniciar sesión
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
