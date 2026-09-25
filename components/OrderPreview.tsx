'use client'

import { FormEvent, useMemo, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { onSale, priceOf, type Product } from '@/lib/catalog'

const WILAYAS = [
  { name: 'Alger', home: 500, bureau: 350, communes: ['Hydra', 'Bab Ezzouar', 'Chéraga', 'Kouba'] },
  { name: 'Oran', home: 700, bureau: 450, communes: ['Oran', 'Bir El Djir', 'Es Senia'] },
  { name: 'Constantine', home: 750, bureau: 500, communes: ['Constantine', 'El Khroub'] },
  { name: 'Blida', home: 550, bureau: 400, communes: ['Blida', 'Boufarik'] },
  { name: 'Sétif', home: 800, bureau: 550, communes: ['Sétif', 'El Eulma'] },
  { name: 'Annaba', home: 850, bureau: 600, communes: ['Annaba', 'El Bouni'] },
]

export function OrderPreview({ product }: { product: Product }) {
  const [size, setSize] = useState('')
  const [color, setColor] = useState(product.colors.length === 1 ? product.colors[0] : '')
  const [wilaya, setWilaya] = useState('')
  const [commune, setCommune] = useState('')
  const [method, setMethod] = useState<'home' | 'bureau'>('home')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const zone = WILAYAS.find((w) => w.name === wilaya)
  const delivery = zone ? (method === 'home' ? zone.home : zone.bureau) : null
  const goods = priceOf(product)
  const total = delivery === null ? null : goods + delivery
  const colorMode = product.colors.length === 0 ? 'none' : product.colors.length === 1 ? 'single' : 'multi'

  const communes = useMemo(() => zone?.communes || [], [zone])

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!size || !wilaya || !commune || (colorMode === 'multi' && !color)) {
      setError('Fill size, wilaya, and commune to preview the confirmation.')
      return
    }
    setError('')
    setDone(true)
  }

  const field =
    'form-select w-full rounded-xl border border-white/15 bg-black px-3 py-2.5 outline-none focus:border-white/50'

  if (done) {
    return (
      <div className="rounded-2xl border border-ok/40 bg-ok/10 p-8 text-center" dir="rtl">
        <CheckCircle className="mx-auto text-ok" size={32} />
        <p className="mt-4 text-xl">تم استلام الطلب</p>
        <p className="mt-2 text-sm text-muted">هذه معاينة فقط. ما ترسل حتى الآن.</p>
        <p className="mt-4 text-lg">{total?.toLocaleString()} DA</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} dir="rtl" className="space-y-4 rounded-2xl border border-white/10 bg-surface p-5 text-right">
      <div>
        <p className="font-serif text-3xl italic">اطلب الآن</p>
        <p className="mt-1 text-xs text-muted">الدفع عند الاستلام · أسعار التوصيل نموذجية</p>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3" dir="ltr">
        <span>{goods.toLocaleString()} DA</span>
        {onSale(product) && (
          <span className="text-sm text-muted line-through">{product.basePrice.toLocaleString()} DA</span>
        )}
      </div>

      <label className="block space-y-1 text-sm">
        <span className="text-muted">المقاس *</span>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={field}
        >
          <option value="">Size</option>
          {product.sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      {colorMode === 'multi' && (
        <label className="block space-y-1 text-sm">
          <span className="text-muted">اللون *</span>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={field}
          >
            <option value="">Color</option>
            {product.colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      )}

      {colorMode === 'single' && (
        <label className="block space-y-1 text-sm">
          <span className="text-muted">اللون</span>
          <input
            value={product.colors[0]}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-white/15 bg-black px-3 py-2.5 text-muted"
          />
        </label>
      )}

      <label className="block space-y-1 text-sm">
        <span className="text-muted">الإسم الكامل</span>
        <input className="w-full rounded-xl border border-white/15 bg-black px-3 py-2.5 outline-none focus:border-white/50" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-muted">الهاتف</span>
        <input
          dir="ltr"
          className="w-full rounded-xl border border-white/15 bg-black px-3 py-2.5 text-left outline-none focus:border-white/50"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted">الولاية *</span>
        <select
          value={wilaya}
          onChange={(e) => {
            setWilaya(e.target.value)
            setCommune('')
          }}
          className={field}
        >
          <option value="">Wilaya</option>
          {WILAYAS.map((w) => (
            <option key={w.name} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted">البلدية *</span>
        <select
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
          className={field}
        >
          <option value="">Commune</option>
          {communes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-2">
        {(
          [
            ['home', 'للمنزل'],
            ['bureau', 'مكتب'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMethod(id)}
            className={`rounded-xl border px-3 py-2.5 text-sm ${
              method === id ? 'border-white bg-white text-black' : 'border-white/15 text-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2 rounded-xl bg-black/50 p-3 text-sm" dir="ltr">
        <Row label="Product" value={`${goods.toLocaleString()} DA`} />
        <Row label="Delivery" value={delivery === null ? '—' : `${delivery.toLocaleString()} DA`} />
        <Row label="Total" value={total === null ? '—' : `${total.toLocaleString()} DA`} strong />
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}

      <button type="submit" className="w-full rounded-xl bg-white py-3 text-sm font-semibold tracking-wide text-black">
        تأكيد الطلب
      </button>
    </form>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? 'font-bold text-white' : 'text-muted'}`}>
      <span>{label}</span>
      <span className="tabular-nums text-white">{value}</span>
    </div>
  )
}
