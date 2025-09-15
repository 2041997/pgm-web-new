"use client"
import React from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

export default function BottomBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-emerald-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Stay home & get your daily needs from our shop</h2>
              <p className="text-slate-600 mb-6">Start Your Daily Shopping with <span className="text-emerald-600">Nest Mart</span></p>

              <div className="flex max-w-xl bg-white rounded-full overflow-hidden shadow-sm">
                <div className="flex items-center px-4 text-slate-400">
                  <PaperAirplaneIcon className="h-5 w-5" />
                </div>
                <input type="email" placeholder="Your email address" className="flex-1 px-6 py-4 outline-none" />
                <button className="bg-emerald-500 text-white px-8 py-4 rounded-full">Subscribe</button>
              </div>
            </div>

            <div className="hidden md:block">
              {/* decorative images or vector art can be placed here */}
              <div className="h-48 bg-[url('/images/delivery-hero.png')] bg-right bg-contain bg-no-repeat"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
