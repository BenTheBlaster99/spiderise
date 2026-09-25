'use client'

import { Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Shell } from '@/components/SiteChrome'
import { ProductCard } from '@/components/ProductCard'
import { CATEGORIES, PRODUCTS } from '@/lib/catalog'

function ShopContent() {
  const params = useSearchParams()
  const category = params.get('category')
  const list = useMemo(
    () => (category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS),
    [category]
  )

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-5xl italic">{category || 'Shop'}</h1>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/shop" className={!category ? 'text-white' : 'text-muted hover:text-white'}>
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${encodeURIComponent(cat)}`}
              className={category === cat ? 'text-white' : 'text-muted hover:text-white'}
            >
              {cat}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </Shell>
  )
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  )
}
