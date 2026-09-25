import Link from 'next/link'
import { onSale, priceOf, type Product } from '@/lib/catalog'
import { ProductVisual } from '@/components/ProductVisual'

export function ProductCard({ product }: { product: Product }) {
  const sale = onSale(product)

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-black">
        <div className="absolute inset-0 transition duration-500 group-hover:scale-105">
          <ProductVisual product={product} />
        </div>
        {sale && (
          <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] font-semibold tracking-wider text-black">
            SALE
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-base">{product.name}</h3>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">{product.category}</p>
        <p className="text-sm">
          <span>{priceOf(product).toLocaleString()} DA</span>
          {sale && (
            <span className="ml-2 text-muted line-through">{product.basePrice.toLocaleString()} DA</span>
          )}
        </p>
      </div>
    </Link>
  )
}
