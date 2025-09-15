"use client"
import React, { useState, useEffect, useCallback } from 'react'
import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/types/ecommerce'
import { productApi } from '@/services'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import useEmblaCarousel from 'embla-carousel-react'

// products will be fetched from the API

export default function DailyBestSale() {
  // Responsive breakpoints: mobile=1, tablet=3, desktop=4
  const [slidesToShow, setSlidesToShow] = useState(4)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

 console.log("sssssss", products)
  

  // Configure Embla with professional options
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    inViewThreshold: 0.7
  })

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setSlidesToShow(1) // Mobile: 1 card
      } else if (width < 1024) {
        setSlidesToShow(3) // Tablet: 3 cards  
      } else {
        setSlidesToShow(4) // Desktop: 4 cards
      }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Update scroll button states
  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateScrollButtons()
    emblaApi.on('select', updateScrollButtons)
    emblaApi.on('reInit', updateScrollButtons)
  }, [emblaApi, updateScrollButtons])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Calculate slide width based on current breakpoint
  const slideWidth = 100     / slidesToShow

  // Load products from API on mount
  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await productApi.getProducts({ limit: 12 })
        // handle nested response shapes defensively
        const data = res?.data ?? res
        if (mounted) {
          if (res?.success && Array.isArray(data)) {
            setProducts(data as Product[])
          } else if (Array.isArray(data)) {
            setProducts(data as Product[])
          } else if ((res as any)?.data && Array.isArray((res as any).data)) {
            setProducts((res as any).data as Product[])
          }
        }
      } catch (err) {
        console.error('Error loading DailyBestSale products', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-3xl font-semibold text-slate-800">Daily Best Sells</h4>
        </div>

        <div className="flex gap-6">
          <div className="hidden md:flex w-[25%] bg-emerald-50 rounded-xl p-10 items-center">
            <div>
              <h3 className="text-4xl font-bold text-slate-800 mb-6">Bring nature into your home</h3>
              <p className="text-slate-600 mb-6">Discover natural and organic products selected just for you.</p>
              <button className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded">Shop Now</button>
            </div>
          </div>

          <div className="flex-1 w-full md:w-[75%]">
            <div className="relative w-full">
              <button 
                onClick={scrollPrev} 
                disabled={!canScrollPrev}
                aria-label="Previous" 
                className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full border bg-white shadow flex items-center justify-center z-10 transition-opacity ${
                  canScrollPrev ? 'opacity-100 hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronLeftIcon className="h-5 w-5 text-slate-600" />
              </button>
              <button 
                onClick={scrollNext} 
                disabled={!canScrollNext}
                aria-label="Next" 
                className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full border bg-white shadow flex items-center justify-center z-10 transition-opacity ${
                  canScrollNext ? 'opacity-100 hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronRightIcon className="h-5 w-5 text-slate-600" />
              </button>

              {/* Embla viewport with responsive height */}
              <div 
                className="overflow-hidden w-full pb-4 h-[480px] sm:h-[420px] md:h-[380px] lg:h-[420px]" 
                ref={emblaRef as unknown as React.RefObject<HTMLDivElement>}
              >
                <div className="flex gap-3 sm:gap-4 md:gap-6 h-full" style={{ willChange: 'transform' }}>
                  {products.map((p, index) => (
                    <div 
                      key={`${p.id}-${index}`} 
                      className="flex-shrink-0 h-full" 
                      style={{ width: `${slideWidth}%` }}
                    > 
                      <div className="h-full w-full flex px-1">
                        <ProductCard 
                          product={p}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
