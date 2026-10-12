import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/products.service";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            NovaStore
          </span>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            Productos destacados
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Explora nuestra selección de productos tecnológicos y encuentra el
            que mejor se adapte a tus necesidades.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
