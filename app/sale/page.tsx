import { Shell } from '@/components/SiteChrome'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS, onSale } from '@/lib/catalog'

export default function SalePage() {
  const list = PRODUCTS.filter(onSale)

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-5xl italic">Sale</h1>
        <p className="mt-3 text-sm text-muted">The crossed price is the old one.</p>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </Shell>
  )
}
