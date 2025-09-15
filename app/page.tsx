"use client"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, StarIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import ProductGrid from '@/components/product/ProductGrid'
import HeroSection from '@/components/home/HeroSection'
import backgroundImg from '../public/image.png'
import Category from '@/components/home/Category'
import PromoBanners from '@/components/home/PromoBanners'
import DailyBestSale from '@/components/home/DailyBestSale'
import DealOfDay from '@/components/home/DealOfDay'
import BottomBanner from '@/components/home/BottomBanner'
import BottomCard from '@/components/home/BottomCard'

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
      
  <HeroSection backgroundImage={backgroundImg} />
  {/* <PromoBanners /> */}
  <Category />
  <PromoBanners />
  


      {/* Featured Products */}
      <section className="py-0 bg-white">
        <div className="container mx-auto px-4">
          

          <ProductGrid 
            filters={{
              sortBy: "rating",
              limit: 8
            }}
            title="Featured Products"
            showFilters={true}
          />
        </div>
      </section>

  <DailyBestSale />
  <DealOfDay />

  <BottomBanner />
  <BottomCard />
    </div>
  )
}
