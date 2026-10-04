
import ProductCard from "@/components/ProductCard";
const products = [
  {
    id: 1,
    name: "iPhone 11",
    description: "Smartphone de Apple con cámara dual y pantalla Liquid Retina.",
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
    description: "Tablet de alto rendimiento para productividad y entretenimiento.",
    price: 799,
    stock: 6,
  },
  {
    id: 4,
    name: "Apple Watch Series 6",
    description: "Reloj inteligente para actividad física y seguimiento de salud.",
    price: 399,
    stock: 12,
  },
];
export default function Home() {
  return (
    <main>
      

      <section>
        <h2>Bienvenido a NovaStore</h2>
        <p>Encuentra los mejores productos en un solo lugar.</p>
        <button>Ver productos</button>
      </section>

      <section>
  <h2>Productos destacados</h2>

  <div>
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