export type Category = 'T-Shirt' | 'Hoodie' | 'Compression'

export type Product = {
  slug: string
  name: string
  category: Category
  description: string
  basePrice: number
  salePrice?: number
  /** Empty hides color. One locks it. Several opens a picker. */
  colors: string[]
  sizes: string[]
}

export const CATEGORIES: Category[] = ['T-Shirt', 'Hoodie', 'Compression']

export const PRODUCTS: Product[] = [
  {
    slug: 'widow-oversized-tee',
    name: 'Widow Oversized Tee',
    category: 'T-Shirt',
    description:
      'Heavy oversized tee. Dropped shoulder, long body, cut to sit over the rest of the fit.',
    basePrice: 4200,
    salePrice: 3600,
    colors: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'silk-thread-hoodie',
    name: 'Silk Thread Hoodie',
    category: 'Hoodie',
    description:
      'Brushed fleece hoodie with a quiet chest mark. One colorway — black, as the drop is cut.',
    basePrice: 7500,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'venom-compression',
    name: 'Venom Compression',
    category: 'Compression',
    description:
      'Second-skin compression top. Tight through the arm, long enough to layer under an oversized piece.',
    basePrice: 3900,
    salePrice: 3400,
    colors: ['Black', 'Stone'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'lattice-zip',
    name: 'Lattice Zip',
    category: 'Hoodie',
    description: 'Full-zip fleece with a high collar. Built for night drops and cold wilayas.',
    basePrice: 8200,
    colors: [],
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'night-spinner-tee',
    name: 'Night Spinner Tee',
    category: 'T-Shirt',
    description: 'Boxy tee in a denser cotton. The monogram sits small, low on the chest.',
    basePrice: 3900,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'web-longsleeve',
    name: 'Web Longsleeve',
    category: 'T-Shirt',
    description: 'Longsleeve with a narrow cuff. Meant to show under a short sleeve or on its own.',
    basePrice: 4800,
    salePrice: 4100,
    colors: ['Black', 'Bone'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug) || null
}

export function priceOf(product: Product) {
  return product.salePrice && product.salePrice < product.basePrice
    ? product.salePrice
    : product.basePrice
}

export function onSale(product: Product) {
  return Boolean(product.salePrice && product.salePrice < product.basePrice)
}

export function discountPercent(product: Product) {
  if (!onSale(product) || !product.salePrice) return 0
  return Math.round((1 - product.salePrice / product.basePrice) * 100)
}
