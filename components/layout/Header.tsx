"use client"
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon as SearchIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  PhoneIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { cartApi } from '@/services'
import logo from '../../public/logo.png'
import Image from 'next/image'

type SidebarProps = {
  searchQuery: string
  setSearchQuery: (v: string) => void
  onClose: () => void
}

function SidebarContent({ searchQuery, setSearchQuery, onClose }: SidebarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items: { title: string; children?: { label: string; href: string }[] }[] = [
    { title: 'Home' },
    { title: 'Shop', children: [{ label: 'All Products', href: '/products' }, { label: 'Bags', href: '/categories/bag' }] },
    { title: 'About' },
    { title: 'Business' },
    { title: 'Inspire World' },
    { title: 'Gallery' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <div className="text-2xl font-bold text-emerald-500">Nest</div>
        </Link>
        <button onClick={onClose} className="p-2 rounded-full bg-emerald-50 text-emerald-600">
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onClose()
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg"
          />
          <button type="submit" className="p-3 bg-emerald-500 text-white rounded-lg">
            <SearchIcon className="h-5 w-5" />
          </button>
        </form>
      </div>

      <nav className="mt-6">
        <ul className="flex flex-col gap-1">
          {items.map((it, idx) => (
        <li key={it.title} className="rounded-lg hover:bg-emerald-50 transition">
          {it.children ? (
            <>
          <button
            type="button"
            className="flex items-center gap-2 p-2 w-full text-left"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {it.title}
            <svg
              className={`h-4 w-4 ml-auto transition-transform ${openIndex === idx ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {openIndex === idx && (
            <ul className="pl-6 py-1">
              {it.children.map((child) => (
            <li key={child.href}>
              <Link href={child.href} onClick={onClose} className="block py-2 text-gray-700 hover:text-emerald-600">
                {child.label}
              </Link>
            </li>
              ))}
            </ul>
          )}
            </>
          ) : (
            <Link href="/" onClick={onClose} className="flex items-center gap-2 p-2">
          {it.title}
            </Link>
          )}
        </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 border border-gray-100 rounded-md p-4">
        <div className="flex items-center gap-3 mb-3">
          <PhoneIcon className="h-5 w-5 text-emerald-500" />
          <div>
            <div className="font-medium text-gray-800">Our location</div>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Link href="/account" className="text-sm text-gray-700 flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-emerald-500" />
            <span>Log In / Sign Up</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <PhoneIcon className="h-5 w-5 text-emerald-500" />
          <div className="text-sm text-gray-700">(+91) - 91205  - 63563</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium mb-2">Follow Us</div>
        <div className="flex gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-emerald-500 rounded-full">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.772-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-emerald-500 rounded-full">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.8 8.001a2.752 2.752 0 0 0-1.936-1.945C18.02 5.5 12 5.5 12 5.5s-6.02 0-7.864.556A2.752 2.752 0 0 0 2.2 8.001C1.5 9.845 1.5 12 1.5 12s0 2.155.7 3.999a2.752 2.752 0 0 0 1.936 1.945C5.98 18.5 12 18.5 12 18.5s6.02 0 7.864-.556a2.752 2.752 0 0 0 1.936-1.945c.7-1.844.7-3.999.7-3.999s0-2.155-.7-3.999zM10 15.5v-7l6 3.5-6 3.5z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-emerald-500 rounded-full">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [cartCount, setCartCount] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFullHeader, setShowFullHeader] = useState(true)
  const lastShowRef = useRef<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await cartApi.getCartSummary()
        if (res?.success) setCartCount(res.data?.itemCount ?? 0)
      } catch (e) {
        // silent
      }
    })()
  }, [])

  // lock body scroll when sidebar is open
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // show/hide full header based on scroll (hide after 10% scroll) - desktop only
  useEffect(() => {
    if (typeof window === 'undefined') return
    let ticking = false
    const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

    const onScroll = () => {
      if (!isDesktop()) {
        // keep ref in sync to avoid unnecessary toggles when resizing back to desktop
        if (lastShowRef.current !== true) lastShowRef.current = true
        setShowFullHeader(true)
        return
      }
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
        // only update state when the computed visibility actually changes
        const shouldShow = pct < 10
        if (lastShowRef.current !== shouldShow) {
          lastShowRef.current = shouldShow
          setShowFullHeader(shouldShow)
        }
        ticking = false
      })
    }

    const onResize = () => {
      if (!isDesktop()) {
        if (lastShowRef.current !== true) lastShowRef.current = true
        setShowFullHeader(true)
      } else onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Mobile promo banner (mobile only) */}
      <div className={`transition-all duration-300 ${showFullHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'} bg-emerald-500 text-white text-center text-sm py-2 md:hidden`}>
        Grand opening, up to 15% off all items. Only 3 days left
      </div>

      {/* Desktop transition wrapper: contains thin info + main header; collapses on desktop leaving secondary nav visible */}
      <div className={`overflow-hidden transition-[max-height,opacity,transform]  duration-300 ease-in-out md:block ${showFullHeader ? 'max-h-[400px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-3 pointer-events-none'}`}>
        {/* Top thin info bar (desktop) */}
        <div className="hidden md:block px-6 bg-gray-50">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-emerald-500" />
                <span>+91 (9120) 563 563</span>
              </div>
              <div className='text-sm text-emerald-500'>Free shipping on orders over $100</div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/account/login" className="text-gray-700">LOGIN / REGISTER</Link>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-8">
          {/* Mobile header: hamburger, centered logo, icons */}
          <div className="flex items-center justify-between py-3 md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-gray-700">
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link href="/" className="text-2xl font-bold text-emerald-500">
            PGM
              {/* <Image src={logo} alt="Nest" width={40} height={30} /> */}
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/wishlist" className="relative text-gray-700">
                <HeartIcon className="h-5 w-5" />
                <span className="absolute -top-2 -right-0 bg-emerald-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">4</span>
              </Link>
              <Link href="/cart" className="relative text-gray-700">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-0 bg-emerald-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
              </Link>
            </div>
          </div>

          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
              <Link href="/" className="text-2xl font-bold text-emerald-500">
              <Image src={logo} alt="Nest" width={60} height={30} />
            </Link>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">PGM</div>
                <div className="hidden sm:block text-xs text-gray-600">MART & GROCERY</div>
                </div>
              </Link>
            </div>

            <div className="flex-1 max-w-4xl px-6">
              <form onSubmit={handleSearch} className="flex items-center border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <select className="min-w-[160px] px-3 py-3 text-sm text-gray-700 border-r border-gray-200 bg-white">
                  <option>All Categories</option>
                  <option>Fruits & Vegetables</option>
                  <option>Bakery</option>
                  <option>Dairy</option>
                </select>
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm focus:outline-none"
                />
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3">
                  <SearchIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/wishlist" className="relative flex items-center text-gray-700 hover:text-emerald-600 transition">
                <HeartIcon className="h-6 w-6" />
                <span className="absolute -top-2.5 right-0 bg-emerald-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold shadow-md border-2 border-white">
                  6
                </span>
                </Link>

              <Link href="/cart" className="relative text-gray-700">
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-0 bg-emerald-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">{cartCount > 99 ? '99+' : cartCount}</span>
                )}
              </Link>

              <Link href="/account" className="text-gray-700">
                <UserIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary nav row - desktop only and should remain visible when header collapses */}
      <div className="border-t hidden md:block xl:block px-10 border-gray-100">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4  gap-6">
            <button className="hidden md:flex items-center bg-emerald-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-emerald-600">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              Browse All Categories
            </button>
            <Link href="/deals" className="flex items-center gap-1 text-gray-700 hover:text-emerald-600">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M12 3c1.5 3 5 5.5 5 9a5 5 0 11-10 0c0-3.5 3.5-6 5-9z"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="currentColor"
                  fillOpacity={0.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Deals
            </Link>
            <Link href="/home" className="text-gray-700 hover:text-emerald-600">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600">About</Link>
            <Link href="/shop" className="text-gray-700 hover:text-emerald-600">Shop</Link>
            <Link href="/vendors" className="text-gray-700 hover:text-emerald-600">Business</Link>
            <Link href="/vendors" className="text-gray-700 hover:text-emerald-600">Inspire World</Link>
            <Link href="/vendors" className="text-gray-700 hover:text-emerald-600">Gallery</Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center">
              <PhoneIcon className="h-6 w-6 text-emerald-500 mr-2" />
              <div className="text-sm">
                <div className="text-emerald-500 font-semibold">91205 - 63563</div>
                <div className="text-xs text-gray-500">24/7 Support Center</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Sidebar (smooth animated, custom accordion) */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar panel - uses transform for smooth slide */}
        <aside
          className={`fixed inset-y-0 left-0 w-80 bg-white shadow-lg p-4 overflow-auto z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          aria-hidden={!isMenuOpen}
        >
          <SidebarContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClose={() => setIsMenuOpen(false)}
          />
        </aside>
      </div>
    </div>
  )
}
