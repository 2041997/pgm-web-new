'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon as SearchIcon, 
  Bars3Icon as MenuIcon, 
  XMarkIcon as XIcon,
  PhoneIcon,
  ChevronDownIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { cartApi } from '@/services'

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false)

  useEffect(() => {
    loadCartCount()
  }, [])

  const loadCartCount = async () => {
    try {
      const response = await cartApi.getCartSummary()
      if (response.success) {
        setCartCount(response.data.itemCount)
      }
    } catch (error) {
      console.error('Error loading cart count:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4" />
                <span>+77 (756) 334 876</span>
              </div>
              <span className="hidden md:block">Free shipping on orders over $100 | 30-day returns</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/account/login" className="hover:text-gray-300 transition-colors">
                LOGIN / REGISTER
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link href="/" className="text-3xl font-light tracking-wide text-gray-900">
            Basel & Co.
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide">
              HOME
            </Link>
            
            {/* Shop Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide">
                <span>SHOP</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border border-gray-100 py-2 z-50">
                  <Link href="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    All Products
                  </Link>
                  <Link href="/categories/bag" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Bags
                  </Link>
                  <Link href="/categories/shoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Footwear
                  </Link>
                  <Link href="/categories/watches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Watches
                  </Link>
                  <Link href="/categories/woman" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Women
                  </Link>
                  <Link href="/categories/man" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Men
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blog" className="text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide">
              BLOG
            </Link>
            
            {/* Pages Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPagesDropdownOpen(true)}
              onMouseLeave={() => setIsPagesDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide">
                <span>PAGES</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
              {isPagesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border border-gray-100 py-2 z-50">
                  <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    About Us
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Contact
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    FAQ
                  </Link>
                  <Link href="/privacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>

            <Link href="/features" className="text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide">
              FEATURES
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <SearchIcon className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <HeartIcon className="h-5 w-5" />
            </Link>

            {/* User Account */}
            <Link href="/account" className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <UserIcon className="h-5 w-5" />
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800 transition-colors"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              <Link
                href="/"
                className="block py-3 text-gray-900 font-medium tracking-wide border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              
              <div className="border-b border-gray-100">
                <div className="py-3 text-gray-900 font-medium tracking-wide">SHOP</div>
                <div className="pl-4 pb-3 space-y-2">
                  <Link
                    href="/products"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link
                    href="/categories/bag"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bags
                  </Link>
                  <Link
                    href="/categories/shoes"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Footwear
                  </Link>
                  <Link
                    href="/categories/watches"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Watches
                  </Link>
                </div>
              </div>
              
              <Link
                href="/blog"
                className="block py-3 text-gray-900 font-medium tracking-wide border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                BLOG
              </Link>
              
              <div className="border-b border-gray-100">
                <div className="py-3 text-gray-900 font-medium tracking-wide">PAGES</div>
                <div className="pl-4 pb-3 space-y-2">
                  <Link
                    href="/about"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/faq"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              </div>
              
              <Link
                href="/features"
                className="block py-3 text-gray-900 font-medium tracking-wide border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                FEATURES
              </Link>
              
              <Link
                href="/account"
                className="block py-3 text-gray-900 font-medium tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                MY ACCOUNT
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
