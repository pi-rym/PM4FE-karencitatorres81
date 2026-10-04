import ProductCard from "@/components/ProductCard";
const products = [
  {
    id: 1,
    name: "iPhone 11",
    description:
      "Smartphone de Apple con cámara dual y pantalla Liquid Retina.",
    price: 699,
    stock: 10,
  },
  {
    id: 2,
    name: "MacBook Air",
    description: "Laptop ligera y potente ideal para trabajo y estudio.",
    price: 999,
    stock: 8,
  },
  {
    id: 3,
    name: "iPad Pro",
    description:
      "Tablet de alto rendimiento para productividad y entretenimiento.",
    price: 799,
    stock: 6,
  },
  {
    id: 4,
    name: "Apple Watch Series 6",
    description:
      "Reloj inteligente para actividad física y seguimiento de salud.",
    price: 399,
    stock: 12,
  },
];
export default function Home() {
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
