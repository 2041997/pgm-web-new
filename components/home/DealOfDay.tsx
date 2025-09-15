"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ProductCard from '@/components/product/ProductCard'
import { productApi } from '@/services'
import { Product } from '@/types/ecommerce'

export default function DealOfDay() {
  const [deals, setDeals] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await productApi.getProducts({ limit: 4 })
        const data = res?.data ?? res
        if (!mounted) return
        if (res?.success && Array.isArray(data)) setDeals(data as Product[])
        else if (Array.isArray(data)) setDeals(data as Product[])
  else if ((res as any)?.data?.data && Array.isArray((res as any).data.data)) setDeals((res as any).data.data as Product[])
      } catch (err) {
        console.error('Error loading deals', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const itemsToShow = deals.slice(0, 5)

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-slate-800">Deals Of The Day</h2>
          <a href="#" className="text-slate-500 hover:text-slate-700">All Deals &rarr;</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {loading ? (
            <div className="col-span-4 text-center py-6">Loading deals...</div>
          ) : itemsToShow.length > 0 ? (
            itemsToShow.map((p) => (
              <div key={p.id} className="relative rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="relative h-56 md:h-44">
                  {p.images && p.images[0] ? (
                    <Image src={`https://product.pgmbusiness.com/uploads/products/${p.images[0]}`} alt={p.title} fill className="object-cover" />
                  ) : (
                    <div className="bg-gray-100 h-full" />
                  )}
                  <div className="absolute left-6 top-6 flex gap-3">
                    <div className="bg-white rounded-md px-3 py-2 text-emerald-600 text-center">
                      <div className="text-lg font-semibold">00</div>
                      <div className="text-xs">Days</div>
                    </div>
                    <div className="bg-white rounded-md px-3 py-2 text-emerald-600 text-center">
                      <div className="text-lg font-semibold">00</div>
                      <div className="text-xs">Hours</div>
                    </div>
                    <div className="bg-white rounded-md px-3 py-2 text-emerald-600 text-center">
                      <div className="text-lg font-semibold">00</div>
                      <div className="text-xs">Mins</div>
                    </div>
                    <div className="bg-white rounded-md px-3 py-2 text-emerald-600 text-center">
                      <div className="text-lg font-semibold">00</div>
                      <div className="text-xs">Sec</div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{p.title}</h3>
                  <div className="text-sm text-slate-500 mb-3">By <span className="text-emerald-600">{p.brand}</span></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-emerald-600">${p.price}</div>
                      {p.originalPrice && <div className="text-sm text-gray-400 line-through">${p.originalPrice}</div>}
                    </div>
                    <button className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded">Add</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-6">No deals available</div>
          )}
        </div>
      </div>
    </section>
  )
}
