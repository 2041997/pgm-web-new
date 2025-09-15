"use client"
import React from 'react'
import Image from 'next/image'

type Banner = {
  id: string
  title: string
  cta?: string
  image: string
  bg: string
}

const banners: Banner[] = [
  { id: 'b1', title: 'Everyday Fresh &\nClean with Our Products', cta: 'Shop Now', image: '/images/onion.png', bg: 'bg-amber-50' },
  { id: 'b2', title: 'Make your Breakfast\nHealthy and Easy', cta: 'Shop Now', image: '/images/strawberry-bottle.png', bg: 'bg-pink-50' },
  { id: 'b3', title: 'The best Organic\nProducts Online', cta: 'Shop Now', image: '/images/veg-basket.png', bg: 'bg-sky-50' },
]

export default function PromoBanners() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((b) => (
            <div key={b.id} className={`${b.bg} rounded-xl p-8 md:p-10 flex items-center`}>
              <div className="flex-1 pr-4 md:pr-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight whitespace-pre-line">{b.title}</h3>
                <button className="mt-6 inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded shadow">
                  <span className="text-sm font-medium">{b.cta}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 1.414L10.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4z" clipRule="evenodd"/></svg>
                </button>
              </div>
              <div className="w-36 h-36 md:w-48 md:h-48 relative flex-shrink-0">
                <Image src={b.image} alt="promo" fill className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
