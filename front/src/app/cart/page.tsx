export default function Cart() {
  return (
    <main>
      <h1>Carrito de compras</h1>

      <section>
        <article>
          <h2>iPhone 11</h2>
          <p>Precio: $699</p>
          <p>Cantidad: 1</p>
        </article>

        <article>
          <h2>AirPods Pro</h2>
          <p>Precio: $249</p>
          <p>Cantidad: 1</p>
        </article>
      </section>

      <section>
        <h2>Resumen de compra</h2>
        <p>Total: $948</p>

        <button>Finalizar compra</button>
      </section>
    </main>
  );
}