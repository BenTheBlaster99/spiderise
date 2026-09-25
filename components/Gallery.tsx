'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import type { Product } from '@/lib/catalog'
import { ProductVisual } from '@/components/ProductVisual'

const FRAMES = [0, 1, 2]

export function Gallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [touchX, setTouchX] = useState<number | null>(null)

  function go(dir: -1 | 1) {
    setIndex((i) => (i + dir + FRAMES.length) % FRAMES.length)
  }

  function onTouchEnd(x: number) {
    if (touchX === null) return
    const dx = x - touchX
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    setTouchX(null)
  }

  return (
    <>
      <div className="space-y-3">
        <div
          className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-black"
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
        >
          <ProductVisual product={product} frame={FRAMES[index]} priority />
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white"
          >
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            aria-label="Fullscreen"
            onClick={() => setOpen(true)}
            className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/60 p-2 text-white"
          >
            <Maximize2 size={16} />
          </button>
        </div>
        <div className="flex gap-2">
          {FRAMES.map((frame) => (
            <button
              key={frame}
              type="button"
              onClick={() => setIndex(frame)}
              className={`relative h-20 w-16 overflow-hidden border ${
                index === frame ? 'border-white' : 'border-white/15'
              }`}
            >
              <ProductVisual product={product} frame={frame} />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-black">
          <div className="flex items-center justify-between px-4 py-3 text-white/70">
            <p className="text-sm">
              {index + 1} / {FRAMES.length}
            </p>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="p-2">
              <X size={18} />
            </button>
          </div>
          <div
            className="relative min-h-0 flex-1"
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
          >
            <ProductVisual product={product} frame={FRAMES[index]} />
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
