"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { useAuth } from "@/context/AuthContext";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Omit<CartProduct, "quantity">) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartOwner, setCartOwner] = useState<string | null>(null);

  // Identificar la sesión actual
  const currentToken =
    !isLoading && isAuthenticated && typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // Mostrar productos únicamente a la sesión propietaria
  const activeCart = currentToken && cartOwner === currentToken ? cart : [];

  // Agregar un producto al carrito
  const addToCart = (product: Omit<CartProduct, "quantity">) => {
    if (!currentToken || product.stock <= 0) {
      return;
    }

    setCart((previousCart) => {
      const currentCart = cartOwner === currentToken ? previousCart : [];

      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.stock),
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOwner(currentToken);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (productId: number) => {
    if (!currentToken || cartOwner !== currentToken) {
      return;
    }

    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId),
    );
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
    setCartOwner(null);
  };

  // Calcular el total del carrito activo
  const total = activeCart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  // Calcular la cantidad de productos
  const totalItems = activeCart.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart: activeCart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider");
  }

  return context;
}
