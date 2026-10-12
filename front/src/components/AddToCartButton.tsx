"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  productId: number;
  name: string;
  price: number;
  stock: number;
}

export default function AddToCartButton({
  productId,
  name,
  price,
  stock,
}: AddToCartButtonProps) {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();
  const { addToCart } = useCart();

  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    setMessage("");

    if (isLoading) {
      return;
    }

    // Comprobar que el usuario inició sesión
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      router.push("/login");
      return;
    }

    // Comprobar disponibilidad
    if (stock <= 0) {
      setMessage("Este producto está agotado.");
      return;
    }

    // Agregar el producto al carrito
    addToCart({
      id: productId,
      name,
      price,
      stock,
    });

    setMessage("¡Producto agregado al carrito!");
  };

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isLoading || stock <= 0}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading
          ? "Verificando sesión..."
          : stock <= 0
            ? "Producto agotado"
            : "Agregar al carrito"}
      </button>

      {message && (
        <p
          role="status"
          className="mt-3 text-center text-sm font-medium text-green-600"
        >
          {message}
        </p>
      )}
    </div>
  );
}
