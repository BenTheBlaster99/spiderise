import Link from 'next/link'
import Image from 'next/image'
import { Shell } from '@/components/SiteChrome'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/catalog'

export default function Home() {
  return (
    <Shell>
      <section className="web-fade flex min-h-[78vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-xs uppercase tracking-[0.42em] text-muted">Spiderise</p>
        <Image
          src="/logo.png"
          alt="Spiderise"
          width={420}
          height={560}
          priority
          className="mt-6 h-56 w-auto md:h-72"
        />
        <h1 className="font-gothic mt-6 text-3xl md:text-5xl">Spun in the dark</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Limited streetwear from Algeria. Shop the drop, pay on delivery.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="bg-white px-8 py-3 text-sm font-semibold tracking-[0.14em] text-black"
          >
            Shop
          </Link>
          <Link
            href="/sale"
            className="border border-white/40 px-8 py-3 text-sm font-semibold tracking-[0.14em]"
          >
            Sale
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-serif text-4xl italic">The drop</h2>
          <Link href="/shop" className="text-sm text-muted hover:text-white">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </Shell>
  )
}
