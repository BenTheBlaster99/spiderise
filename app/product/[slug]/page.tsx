import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Shell } from '@/components/SiteChrome'
import { Gallery } from '@/components/Gallery'
import { OrderPreview } from '@/components/OrderPreview'
import { getProduct, onSale, priceOf } from '@/lib/catalog'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  const sale = onSale(product)

  return (
    <Shell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-2 lg:items-start">
        <Gallery product={product} />
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{product.category}</p>
            <h1 className="font-serif mt-2 text-4xl italic md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-2xl">
              {priceOf(product).toLocaleString()} DA
              {sale && (
                <span className="ml-3 text-base text-muted line-through">
                  {product.basePrice.toLocaleString()} DA
                </span>
              )}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
            <Link href="/shop" className="mt-4 inline-block text-sm text-muted hover:text-white">
              Back to shop
            </Link>
          </div>
          <OrderPreview product={product} />
        </div>
      </section>
    </Shell>
  )
}
