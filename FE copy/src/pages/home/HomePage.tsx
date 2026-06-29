import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Cpu, ShieldCheck, Leaf } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/fashion'
import { ProductService } from '@/services/product.api'
import type { Product } from '@/types/product.types'

// Mock products to display as fallback if the backend is down or empty
const MOCK_PRODUCTS: Product[] = [
  {
    _id: 'mock-1',
    name: 'Classic Wool Trench Coat',
    description: 'A timeless double-breasted trench coat crafted from premium wool blend.',
    price: 3450000,
    originalPrice: 4200000,
    category: 'JACKET',
    gender: 'UNISEX',
    images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80', publicId: 'mock-1-img' }],
    variants: [],
    tags: ['featured', 'winter'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'mock-2',
    name: 'Oversized Organic Cotton Tee',
    description: 'Breathable, minimal t-shirt made from 100% organic cotton.',
    price: 490000,
    category: 'T-SHIRT',
    gender: 'UNISEX',
    images: [{ url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', publicId: 'mock-2-img' }],
    variants: [],
    tags: ['featured', 'summer'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'mock-3',
    name: 'Minimalist Leather Boots',
    description: 'Handcrafted leather boots with lightweight sole.',
    price: 2890000,
    category: 'SHOES',
    gender: 'MEN',
    images: [{ url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80', publicId: 'mock-3-img' }],
    variants: [],
    tags: ['featured'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'mock-4',
    name: 'Signature Canvas Tote Bag',
    description: 'Durable canvas tote bag with leather straps and raw accents.',
    price: 750000,
    category: 'BAG',
    gender: 'WOMEN',
    images: [{ url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80', publicId: 'mock-4-img' }],
    variants: [],
    tags: ['featured'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await ProductService.getProducts({ featured: true, limit: 4 })
        if (response.data?.data && response.data.data.length > 0) {
          setProducts(response.data.data)
        } else {
          setProducts(MOCK_PRODUCTS)
        }
      } catch (err) {
        console.warn('Backend offline or empty, falling back to mock products.', err)
        setProducts(MOCK_PRODUCTS)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeaturedProducts()
  }, [])

  return (
    <div className="flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative flex h-[90vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80"
            alt="ALTERA Hero Visual"
            className="h-full w-full object-cover object-center opacity-40 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-[var(--spacing-contentMax)] px-6 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500"
          >
            Gen-Z AI Fashion Platform
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-heading text-5xl font-black uppercase tracking-wider sm:text-7xl lg:text-8xl"
          >
            Evolve Your Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-zinc-300 sm:text-base"
          >
            Design custom clothing in 3D, get tailored outfit recommendations driven by AI, and showcase your signature aesthetic.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild variant="accent" size="lg" className="uppercase font-semibold tracking-wider px-8">
              <Link to="/products">Shop Catalog</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black uppercase font-semibold tracking-wider px-8">
              <Link to="/design" className="flex items-center gap-2">
                3D Studio <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Sustainable Fashion Section */}
      <section className="py-24 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
                <Leaf className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl">
                Eco-Friendly & Sustainable
              </h2>
              <p className="mt-6 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                ALTERA is committed to reducing environmental impact. Our custom studio generates patterns directly for production, ensuring zero inventory waste. We prioritize organic materials, ethical labor, and circular design principles.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading text-lg font-semibold text-[var(--color-foreground)]">100% Organic</h4>
                  <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Finest GOTS certified organic fibers</p>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-[var(--color-foreground)]">Zero Waste</h4>
                  <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">On-demand production prints only what is needed</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
                alt="Sustainable production"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI Stylist Section */}
      <section className="bg-zinc-950 py-24 text-white">
        <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
                alt="AI Outfit recommendation"
                className="h-full w-full object-cover brightness-90"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-500">
                <Sparkles className="h-3.5 w-3.5" /> AI Outfit Stylist
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl">
                Personalized AI Styling
              </h2>
              <p className="mt-6 text-sm text-zinc-400 leading-relaxed">
                Unsure how to match colors or layers? Chat with our AI Stylist. It analyzes your aesthetic preference, weather conditions, and body fit to generate custom lookbook recommendations that coordinate seamlessly.
              </p>
              <div className="mt-8">
                <Button asChild variant="accent" className="uppercase font-semibold tracking-wider">
                  <Link to="/outfit" className="flex items-center gap-2">
                    Try AI Stylist <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Custom Design Studio Section */}
      <section className="py-24 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-500">
                <Cpu className="h-3.5 w-3.5" /> 3D Design Studio
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl">
                Design Your Own Canvas
              </h2>
              <p className="mt-6 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Take complete creative control. Upload your own PNG/SVG graphic artworks, select premium base fabrics, apply dynamic patterns, and preview your custom streetwear apparel in full 3D.
              </p>
              <div className="mt-8">
                <Button asChild variant="primary" className="uppercase font-semibold tracking-wider">
                  <Link to="/design" className="flex items-center gap-2">
                    Launch 3D Studio <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)]">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80"
                alt="3D design interface preview"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Products */}
      <section className="py-24 bg-[var(--color-neutral)]">
        <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="font-heading text-3xl font-bold uppercase tracking-wide">
                Featured Catalog
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                Our latest trend-setting minimalist essentials
              </p>
            </div>
            <Button asChild variant="outline" className="uppercase font-semibold tracking-wider">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col space-y-4">
                    <div className="aspect-[3/4] w-full animate-pulse rounded-[var(--radius-md)] bg-zinc-300 dark:bg-zinc-800" />
                    <div className="h-4 w-2/3 animate-pulse bg-zinc-300 dark:bg-zinc-800" />
                    <div className="h-4 w-1/3 animate-pulse bg-zinc-300 dark:bg-zinc-800" />
                  </div>
                ))
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide">
            Loved By Gen-Z
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] p-8 text-left transition-all hover:shadow-md">
              <p className="text-sm font-light italic leading-relaxed text-[var(--color-muted-foreground)]">
                "The 3D custom shirt designer is insane. I uploaded my graphics, customized the t-shirt color, and the final print came out exactly how I previewed it!"
              </p>
              <div className="mt-8">
                <h5 className="font-heading text-sm font-bold">Alex Carter</h5>
                <p className="text-xs text-[var(--color-muted-foreground)]">Digital Artist</p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] p-8 text-left transition-all hover:shadow-md">
              <p className="text-sm font-light italic leading-relaxed text-[var(--color-muted-foreground)]">
                "The AI Outfit Recommendation tool is a lifesaver. It suggested a perfect mix-and-match coat and boots combo that I wouldn't have thought to pair myself."
              </p>
              <div className="mt-8">
                <h5 className="font-heading text-sm font-bold">Sophia Nguyen</h5>
                <p className="text-xs text-[var(--color-muted-foreground)]">Fashion Blogger</p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] p-8 text-left transition-all hover:shadow-md">
              <p className="text-sm font-light italic leading-relaxed text-[var(--color-muted-foreground)]">
                "On-demand printing means zero waste, which is super important to me. High quality prints combined with a great environmental mindset."
              </p>
              <div className="mt-8">
                <h5 className="font-heading text-sm font-bold">Jordan Lee</h5>
                <p className="text-xs text-[var(--color-muted-foreground)]">Eco Activist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="bg-[var(--color-foreground)] text-[var(--color-background)] py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-3xl font-black uppercase tracking-wider sm:text-4xl">
            Join the ALTERA Movement
          </h2>
          <p className="mt-4 text-sm font-light opacity-80 leading-relaxed">
            Subscribe to our newsletter to receive curated styling drops, exclusive designer collaborations, and early access to drops.
          </p>
          <form className="mt-10 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-[var(--radius-md)] border border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <Button variant="accent" size="lg" className="h-12 uppercase font-semibold tracking-wider whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs opacity-60">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" /> Secure checkout
            </span>
            <span>•</span>
            <span>Easy returns</span>
          </div>
        </div>
      </section>
    </div>
  )
}
