"use client"
import React from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

export default function BottomCard() {
  const items = [
    { icon: '💲', title: 'Best prices & offers', sub: 'Orders $50 or more' },
    { icon: '🚚', title: 'Free delivery', sub: '24/7 amazing services' },
    { icon: '💡', title: 'Great daily deal', sub: 'When you sign up' },
    { icon: '🧾', title: 'Wide assortment', sub: 'Mega Discounts' },
    { icon: '🔁', title: 'Easy returns', sub: 'Within 30 days' },
  ]

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="group bg-green-500/10 border border-green-100 hover:shadow-lg hover:-translate-y-1 transform transition duration-200 rounded-xl p-5 flex items-start gap-4"
              role="article"
              aria-label={it.title}
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg bg-green-500/20 flex items-center justify-center text-2xl">
                  <span aria-hidden>{it.icon}</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="font-semibold text-slate-800 truncate">{it.title}</div>
                <div className="text-sm text-slate-500 mt-1">{it.sub}</div>
              </div>

              <div className="ml-auto self-center opacity-0 group-hover:opacity-100 transition">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
