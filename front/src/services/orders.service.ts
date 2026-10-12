const API_URL = "http://localhost:3000";

// Producto asociado a una compra
export interface OrderProduct {
  id: number;
  name: string;
  price: number;
}

// Orden registrada en la base de datos
export interface Order {
  id: number;
  status: string;
  date: string;
  products: OrderProduct[];
}

// Obtener las compras del usuario autenticado
export async function getUserOrders(): Promise<Order[]> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Debes iniciar sesión para consultar tus compras.");
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message ||
        errorData?.error ||
        "No se pudo obtener el historial de compras.",
    );
  }

  return response.json();
}

// Registrar una nueva compra
export async function createOrder(productIds: number[]): Promise<Order> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Debes iniciar sesión para realizar una compra.");
  }

  if (productIds.length === 0) {
    throw new Error("No puedes realizar una compra con el carrito vacío.");
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      products: productIds,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message ||
        errorData?.error ||
        "No se pudo registrar la compra.",
    );
  }

  return response.json();
}
