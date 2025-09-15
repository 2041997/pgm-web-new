"use client"
import BottomCard from '@/components/home/BottomCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/about-hero-left.jpg" alt="hero" width={800} height={900} className="w-full h-auto object-cover" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">Welcome to Nest</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

            <p className="mt-4 text-gray-600 leading-relaxed">Ius ferri velit sanctus eu, sed at soleat accusata. Dictas prompta et. Ut placerat legendos interpre. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget. Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut ornare lectus.</p>

            <div className="mt-8 grid grid-cols-3 gap-3 items-center">
              <div className="relative">
                <Image src="/images/about-thumb-1.jpg" alt="thumb1" width={120} height={80} className="rounded-md object-cover w-full h-20" />
              </div>
              <div className="relative">
                <Image src="/images/about-thumb-2.jpg" alt="thumb2" width={120} height={80} className="rounded-md object-cover w-full h-20" />
              </div>
              <div className="relative">
                <Image src="/images/about-thumb-3.jpg" alt="thumb3" width={120} height={80} className="rounded-md object-cover w-full h-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide - features grid */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-center text-gray-800">What We Provide?</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Best Prices & Offers', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.' },
            { title: 'Wide Assortment', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.' },
            { title: 'Free Delivery', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.' },
            { title: 'Easy Returns', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.' },
            { title: '100% Satisfaction', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.' },
            { title: 'Great Daily Deal', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.' },
          ].map((f) => (
            <div key={f.title} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="h-16 w-16 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
                {/* placeholder icon */}
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none"><path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="font-semibold text-gray-800">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
              <Link href="#" className="mt-3 inline-block text-emerald-500 text-sm">Read more</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Performance / Partner section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded overflow-hidden shadow-lg">
              <Image src="/images/about-perf-1.jpg" alt="perf1" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="rounded overflow-hidden shadow-lg">
              <Image src="/images/about-perf-2.jpg" alt="perf2" width={400} height={300} className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Our performance</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-3">Your Partner for e-commerce grocery solution</h2>
            <p className="mt-4 text-gray-600">Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
          </div>
        </div>
      </section>

      {/* Stats banner overlay */}
      <section className="relative py-8">
        <div className="container mx-auto px-6">
          <div className="bg-emerald-800 text-white rounded-xl py-8 px-6 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              {[
                { val: '1+', label: 'Glorious' },
                { val: '5+', label: 'Happy clients' },
                { val: '7+', label: 'Projects complete' },
                { val: '7+', label: 'Advisor' },
                { val: '3+', label: 'Products Sale' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold">{s.val}</div>
                  <div className="text-sm opacity-90">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Our Team</h2>
        <p className="text-center text-gray-500 mt-2">Meet Our Expert Team</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold">Meet Our Expert Team</h3>
            <p className="mt-3 text-gray-600">Proin ullamcorper pretium orci. Donec necsecle risue leo. Nam massa dolor imperdiet neccon sequata congue idsem.</p>
            <Link href="#" className="inline-block mt-4 bg-emerald-500 text-white px-4 py-2 rounded-md">View All Members</Link>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{name:'H. Merinda', title:'CEO & Co-Founder', img:'/images/team-1.jpg'}, {name:'Dilan Specter', title:'Head Engineer', img:'/images/team-2.jpg'}].map((t) => (
              <div key={t.name} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="mx-auto w-40 h-40 rounded-lg overflow-hidden">
                  <Image src={t.img} alt={t.name} width={160} height={160} className="w-full h-full object-cover" />
                </div>
                <h4 className="mt-4 font-semibold text-gray-800">{t.name}</h4>
                <div className="text-sm text-gray-500">{t.title}</div>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <a href="#" className="text-emerald-500">f</a>
                  <a href="#" className="text-emerald-500">t</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-emerald-50 py-12 xl:py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-6 md:justify-between">
          <div>
            <h3 className="text-4xl max-w-2xl font-semibold text-gray-800">Stay home & get your daily needs from our shop</h3>
            <p className="text-gray-600 mt-2">Start Your Daily Shopping with Nest Mart</p>
          </div>
          <div className="w-full md:w-1/2">
            <form className="flex gap-2">
              <input className="flex-1 px-4 py-3 rounded-md border border-gray-200" placeholder="Your email address" />
              <button className="bg-emerald-500 text-white px-6 py-3 rounded-md">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Small icons strip */}
     <BottomCard />
    </main>
  )
}
