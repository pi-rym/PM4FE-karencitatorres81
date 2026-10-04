import { IProduct } from "@/interfaces/IProduct";

const API_URL = "http://localhost:3000";

export async function getProducts(): Promise<IProduct[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  const products: IProduct[] = await response.json();

  return products;
}

export async function getProductById(id: number): Promise<IProduct | null> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Error al obtener el producto");
  }

  const product: IProduct = await response.json();

  return product;
}
