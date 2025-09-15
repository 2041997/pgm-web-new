"use client"
import React from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import useEmblaCarousel from 'embla-carousel-react'

export type CategoryItem = {
  id: string | number
  name: string
  image: string
  count: number
  color?: string // tailwind background or custom hex
}

const demoCategories: CategoryItem[] = [
  { 
    id: 1, 
    name: 'Peach', 
    image: 'https://images.unsplash.com/photo-1631005258442-7ce6c4f01bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80', 
    count: 14, 
    color: 'bg-emerald-50' 
  },
  { 
    id: 2, 
    name: 'Red Apple', 
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 
    count: 54, 
    color: 'bg-rose-50' 
  },
  { 
    id: 3, 
    name: 'Snack', 
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80', 
    count: 56, 
    color: 'bg-amber-50' 
  },
  { 
    id: 4, 
    name: 'Vegetables', 
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1142&q=80', 
    count: 72, 
    color: 'bg-fuchsia-50' 
  },
  { 
    id: 5, 
    name: 'Strawberry', 
    image: 'https://images.unsplash.com/photo-1543528176-61b239494933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
    count: 36, 
    color: 'bg-lime-50' 
  },
  { 
    id: 6, 
    name: 'Black plum', 
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80', 
    count: 123, 
    color: 'bg-rose-50' 
  },
  { 
    id: 7, 
    name: 'Custard apple', 
    image: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 
    count: 34, 
    color: 'bg-amber-50' 
  },
  { 
    id: 8, 
    name: 'Coffee & Tea', 
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80', 
    count: 89, 
    color: 'bg-amber-50' 
  },
  { 
    id: 9, 
    name: 'Headphone', 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 
    count: 87, 
    color: 'bg-emerald-50' 
  },
  { 
    id: 10, 
    name: 'Cake & Milk', 
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
    count: 26, 
    color: 'bg-emerald-50' 
  },
  { 
    id: 11, 
    name: 'Orange', 
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
    count: 42, 
    color: 'bg-amber-50' 
  },
  { 
    id: 12, 
    name: 'Banana', 
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80', 
    count: 38, 
    color: 'bg-yellow-50' 
  },
]

export default function Category({ items = demoCategories }: { items?: CategoryItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false
  })
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const [slidesToShow, setSlidesToShow] = React.useState(8)

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = React.useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Handle responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return
      
      if (window.innerWidth >= 1280) {
        setSlidesToShow(8) // xl
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(5) // lg
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(4) // md
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2) // sm
      } else {
        setSlidesToShow(1) // xs
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect, slidesToShow])

  // Calculate the visible items for the navigation based on slidesToShow
  const visibleNavItems = items.slice(0, Math.min(slidesToShow, 5))

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className='flex flex-row items-center gap-4'>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800">Featured Categories</h3>
            <nav className="hidden md:flex items-center gap-4 text-slate-600">
              {visibleNavItems.map((c, i) => {
                const isActive = i === selectedIndex % visibleNavItems.length
                return (
                  <button
                    key={c.id}
                    onClick={() => scrollTo(i)}
                    className={`text-md ${isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-600'}`}>
                    {c.name}
                  </button>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={scrollPrev} 
                disabled={selectedIndex === 0}
                className="p-2 bg-white rounded-full shadow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-4 w-4 text-slate-600" />
              </button>
              <button 
                onClick={scrollNext} 
                disabled={selectedIndex === scrollSnaps.length - 1}
                className="p-2 bg-white rounded-full shadow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-2 py-2">
          <div className="embla overflow-hidden px-2" ref={emblaRef}>
            <div className="embla__container flex gap-6">
              {items.map((c) => (
                <div 
                  key={c.id} 
                  className="embla__slide"
                  style={{
                    minWidth: `calc(${100 / slidesToShow}% - 14px * ${(slidesToShow - 1) / slidesToShow})`,
                    flex: `0 0 calc(${100 / slidesToShow}% - 14px * ${(slidesToShow - 1) / slidesToShow})`
                  }}
                >
                  <div className={`rounded-xl p-6 ${c.color ?? 'bg-white'} h-full`}>
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-white flex items-center justify-center shadow">
                        <Image 
                          src={c.image} 
                          alt={c.name} 
                          fill 
                          sizes="96px" 
                          className="object-contain p-2" 
                        />
                      </div>
                      <div className="text-lg font-semibold text-slate-800">{c.name}</div>
                      <div className="text-sm text-slate-500">{c.count} items</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          .embla {
            overflow: hidden;
          }
          .embla__container {
            display: flex;
            user-select: none;
            -webkit-touch-callout: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          .embla__slide {
            position: relative;
            padding: 0 0px;
          }
          
          @media (max-width: 640px) {
            .embla__slide {
              min-width: calc(50% - 12px) !important;
              flex: 0 0 calc(50% - 12px) !important;
            }
          }
          
          @media (max-width: 480px) {
            .embla__slide {
              min-width: calc(100% - 24px) !important;
              flex: 0 0 calc(100% - 24px) !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}