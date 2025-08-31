function ProductCard({ product, onAdd }) {
  return (
  <div className="rounded-lg border border-blue-100 bg-white p-3 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-blue-900 truncate dark:text-slate-100">
            {product.name}
          </div>
          <div className="text-xs text-gray-600 dark:text-slate-300">
            {product.brand} • {product.size}
          </div>
          <div className="mt-1 font-medium text-blue-700 dark:text-blue-300">
            ₹{product.price}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => onAdd?.(product)}
    className="w-full rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add to List
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
