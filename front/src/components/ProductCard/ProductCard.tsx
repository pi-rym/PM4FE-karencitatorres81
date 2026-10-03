import { IProductCardProps } from "./IProductCardProps";

export default function ProductCard({
  name,
  description,
  price,
  stock,
}: IProductCardProps) {
  return (
    <article>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Precio: ${price}</p>
      <p>Stock disponible: {stock}</p>
    </article>
  );
}