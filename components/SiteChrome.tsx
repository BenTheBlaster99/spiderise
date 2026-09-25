'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Instagram, Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/sale', label: 'Sale' },
]

const IG = 'https://www.instagram.com/spiderise_dz/'

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <button
            type="button"
            className="p-2 md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Image src="/logo.png" alt="Spiderise" width={120} height={160} priority className="h-11 w-auto" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-[0.16em] ${active ? 'text-white' : 'text-muted hover:text-white'}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted hover:text-white">
            <Instagram size={18} />
          </a>
        </div>
        {open && (
          <nav className="flex flex-col border-t border-white/10 px-4 py-2 md:hidden">
            {LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-3 text-lg">
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {children}

      <footer className="mt-16 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-gothic text-2xl">Spiderise</p>
            <p className="mt-2 text-sm text-muted">Dark streetwear. Algeria.</p>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
            <Link href="/sale" className="hover:text-white">
              Sale
            </Link>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              @spiderise_dz
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
