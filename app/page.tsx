import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, StarIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import ProductGrid from '@/components/product/ProductGrid'

export default function HomePage() {
  const featuredCategories = [
    {
      id: 'bag',
      name: 'Bag',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Premium leather bags and accessories'
    },
    {
      id: 'shoes',
      name: 'Footwear',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Stylish footwear for every occasion'
    },
    {
      id: 'watches',
      name: 'Watches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Luxury timepieces and accessories'
    },
    {
      id: 'woman',
      name: 'Woman',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Elegant fashion for women'
    }
  ]

  const features = [
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: CreditCardIcon,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: StarIcon,
      title: 'Quality Products',
      description: 'Only the best quality products'
    }
  ]

  return (
    <div>
      {/* Hero Section - Basel Style */}
      <section className="relative h-screen bg-gray-100 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Basel Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-6">
              <span className="text-sm uppercase tracking-[0.2em] font-light opacity-90">
                Basel Shopify Theme 2
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
              MAN BAGS
            </h1>
            <div className="mb-8">
              <p className="text-lg md:text-xl font-light opacity-90 mb-2">
                New Men's Collection
              </p>
            </div>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-white text-black font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Secondary Hero - NEW STYLE */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
                  Basel Shopify Theme 2
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight">
                NEW STYLE
              </h2>
              <div className="mb-8">
                <p className="text-lg font-light text-gray-600 mb-4">
                  Boot's Collection For Men
                </p>
              </div>
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-black text-white font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
              >
                SHOP NOW
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="New Style Collection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Connect to Basel & Co.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-gray-900 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-3 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-gray-600 font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
                MADE THE HARD WAY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              FEATURED CATEGORIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group text-center"
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
                MADE THE HARD WAY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              FEATURED PRODUCTS
            </h2>
          </div>

          <ProductGrid 
            filters={{
              sortBy: "rating",
              limit: 8
            }}
            title="Featured Products"
            showFilters={false}
          />

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-black text-white font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-400 font-medium">
                UP TO 70% OFF THE ENTIRE STORE!
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-8">
              MADE WITH LOVE by The4 studio
            </h2>
            <p className="text-lg font-light text-gray-300 mb-12 leading-relaxed">
              Basel & Co. is a powerful eCommerce theme for Shopify. Visit our shop page to
              see all main features for Your Store
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-4 border border-white text-white font-medium uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Join Our Newsletter
            </h2>
            <p className="text-lg font-light text-gray-600 mb-8">
              Hey you, sign up it only takes a second to be the first to find out about our
              latest news and promotions…
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                />
                <button className="px-8 py-4 bg-black text-white font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
