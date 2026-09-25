import Image from 'next/image'
import type { Product } from '@/lib/catalog'

export function ProductVisual({
  product,
  frame = 0,
  priority = false,
}: {
  product: Product
  frame?: number
  priority?: boolean
}) {
  const shift = frame === 1 ? 'scale-110' : frame === 2 ? 'scale-90 opacity-70' : ''

  return (
    <div className="web-fade relative h-full w-full overflow-hidden">
      <div className={`absolute inset-0 flex items-center justify-center ${shift}`}>
        <Image
          src="/logo.png"
          alt={product.name}
          width={480}
          height={640}
          priority={priority}
          className="h-[62%] w-auto object-contain opacity-80"
        />
      </div>
    </div>
  )
}
