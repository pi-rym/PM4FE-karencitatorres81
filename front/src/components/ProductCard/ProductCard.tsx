import { IProductCardProps } from "./IProductCardProps";

export default function ProductCard({
  name,
  description,
  price,
  stock,
}: IProductCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          Tecnología
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900">{name}</h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-6">
        <p className="text-2xl font-bold text-slate-900">${price}</p>

        <p className="mt-2 text-sm font-medium text-green-600">
          Stock disponible: {stock}
        </p>
      </div>

      <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
        Ver producto
      </button>
    </article>
  );
}
