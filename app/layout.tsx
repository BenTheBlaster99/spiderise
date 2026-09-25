import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope, UnifrakturCook } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: '500',
  style: ['normal', 'italic'],
})

const gothic = UnifrakturCook({
  variable: '--font-gothic',
  subsets: ['latin'],
  weight: '700',
})

export const metadata: Metadata = {
  title: 'Spiderise',
  description: 'Spiderise. A dark streetwear atelier. Algeria.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable} ${gothic.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
