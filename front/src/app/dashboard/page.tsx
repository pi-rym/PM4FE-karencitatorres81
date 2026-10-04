export default function Dashboard() {
  return (
    <main>
      <h1>Mi cuenta</h1>

      <section>
        <h2>Información del usuario</h2>

        <p>Nombre: Usuario NovaStore</p>
        <p>Email: usuario@novastore.com</p>
      </section>

      <section>
        <h2>Mis pedidos</h2>

        <article>
          <h3>Pedido #001</h3>
          <p>Estado: Entregado</p>
          <p>Total: $699</p>
        </article>

        <article>
          <h3>Pedido #002</h3>
          <p>Estado: En proceso</p>
          <p>Total: $249</p>
        </article>
      </section>
    </main>
  );
}