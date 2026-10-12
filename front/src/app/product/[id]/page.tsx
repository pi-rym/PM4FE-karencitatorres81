import { notFound } from "next/navigation";
import { getProductById } from "@/services/products.service";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  // Obtener el ID del producto desde la URL
  const { id } = await params;

  const productId = Number(id);

  // Validar que el ID sea un número válido
  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  // Consultar el producto en el backend
  const product = await getProductById(productId);

  // Si no existe, mostrar página no encontrada
  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          Producto #{product.id}
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Detalle del producto
        </h1>
      </div>

      <section className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2">
        {/* Imagen del producto */}
        <div className="flex min-h-80 items-center justify-center rounded-xl bg-slate-100">
          <span className="text-lg font-medium text-slate-400">
            Imagen del producto
          </span>
        </div>

        {/* Información del producto */}
        <div className="flex flex-col justify-center">
          <span className="mb-3 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Tecnología
          </span>

          <h2 className="text-3xl font-bold text-slate-900">{product.name}</h2>

          <p className="mt-4 leading-7 text-slate-600">{product.description}</p>

          <p className="mt-8 text-3xl font-bold text-slate-900">
            ${product.price}
          </p>

          <p className="mt-2 text-sm font-medium text-green-600">
            Stock disponible: {product.stock}
          </p>

          {/* Botón conectado al carrito */}
          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={Number(product.price)}
            stock={product.stock}
          />
        </div>
      </section>
    </main>
  );
}
