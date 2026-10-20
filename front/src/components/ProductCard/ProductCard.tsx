import Link from "next/link";
import { IProductCardProps } from "./IProductCardProps";

// Asignamos una imagen específica a cada producto.
function getProductImage(name: string): string {
  const productName = name.toLowerCase().trim();

  if (productName.includes("iphone 11")) {
    return "/images/iphone-11.jpg";
  }

  if (productName.includes("macbook air")) {
    return "/images/macbook-air.jpg";
  }

  if (productName.includes("ipad pro")) {
    return "/images/ipad-pro.jpg";
  }

  if (productName.includes("apple watch series 6")) {
    return "/images/apple-watch-series-6.jpg";
  }

  if (productName.includes("airpods pro")) {
    return "/images/airpods-pro.jpg";
  }

  if (productName.includes("homepod mini")) {
    return "/images/homepod-mini.jpg";
  }

  return "/images/default.jpg";
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  stock,
}: IProductCardProps) {
  const imageUrl = getProductImage(name);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Imagen del producto */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-50 p-6">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
          Tecnología
        </span>
      </div>

      {/* Información del producto */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <div className="mt-6">
          <p className="text-2xl font-bold text-slate-900">
            ${Number(price).toFixed(2)}
          </p>

          <p className="mt-2 text-sm font-medium text-green-600">
            Stock disponible: {stock}
          </p>
        </div>

        <Link
          href={`/product/${id}`}
          className="mt-6 block w-full rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          Ver producto
        </Link>
      </div>
    </article>
  );
}
