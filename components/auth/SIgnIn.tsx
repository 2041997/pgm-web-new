"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login as loginService, getProfile, getCartByUserId } from '@/services/api'
import { useAuth } from '@/context/useAuth'
import axios from 'axios'
import { coreAssociateBaseUrl } from '@/constants/api'
import backgroundImage from '../../public/loginbackhground.jpg'

export default function SignIn() {
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' })
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()
  const { login, setUserData, setisAssociateData } = useAuth()

  React.useEffect(() => {
    const onLogout = () => {
      try {
        router.replace('/account/login')
      } catch (e) {}
    }
    window.addEventListener('auth:logged-out', onLogout as EventListener)
    return () => window.removeEventListener('auth:logged-out', onLogout as EventListener)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { usernameOrEmail, password } = formData
    if (!usernameOrEmail || !password) {
      setError('Please enter usernameOrEmail and password')
      return
    }
    setLoading(true)
    setIsSubmitting(true)
    console.log("formdata", formData)
    try {
      // Call login service (will set tokens via tokenManager if configured)
      const resp = await loginService(usernameOrEmail, password)
      console.log("first", resp)
      if (!resp || !resp.success || !resp.data) {
        throw new Error(resp?.error || 'Login failed')
      }

      // Extract token/refresh and try to fetch profile
      const d: any = resp.data
      const token = d.accessToken ?? d.token ?? ''
      const refreshToken = d.refreshToken ?? undefined

      // Persist via auth context
      login(token)

      // Try to obtain user profile (either from resp.data.user or from profile endpoint)
      let user = d.user ?? null
      if (!user) {
        const profileRes = await getProfile()
        user = profileRes?.data ?? null
      }

      if (user) {
        setUserData(user)
        try {
          // fetch cart and persist
          const cartRes: any = await getCartByUserId(user.id, token)
          const cartItems = Array.isArray(cartRes?.data) ? cartRes.data : (cartRes?.data?.cartItems ?? [])
          localStorage.setItem('cartItems', JSON.stringify(cartItems || []))
        } catch (cartErr) {
          console.error('Cart fetch failed', cartErr)
        }
      }

      // Save tokens and user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthentication', 'true')
        if (token) localStorage.setItem('token', token)
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
        if (user) localStorage.setItem('user', JSON.stringify(user))
      }

      // Handle associate/admin data
      try {
        const assocResp = await axios.get(`${coreAssociateBaseUrl}/associates/self/data`, { headers: { Authorization: `Bearer ${token}` } })
        if (assocResp?.data) {
          setisAssociateData(assocResp.data)
          localStorage.setItem('associateUser', JSON.stringify(assocResp.data))
        }
      } catch (assocErr) {
        console.log('No associate data found or fetch failed')
        setisAssociateData(null)
        localStorage.removeItem('associateUser')
      }

      // Determine role and navigate
      const role = (user as any)?.role ?? (user as any)?.roles
      setShowSuccess(true)
      if (role === 'ADMIN') {
        router.replace('/dashboard/home')
      } else {
        router.replace('/account/profile')
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Login failed'
      setError(msg)
      console.error(err)
    } finally {
      setLoading(false)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="absolute inset-0 bg-[url('../public/loginbackhground.jpg')] bg-cover bg-center opacity-90" />
      <div className="w-full max-w-4xl z-10 bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        {/* Left hero with background image */}
        <div className="hidden md:flex items-center justify-center p-10 relative bg-purple-600">
          <div className="absolute inset-0 bg-[url('/loginbackhground.jpg')] bg-cover bg-center opacity-90" />
          <div className="relative text-white max-w-xs">
            <h2 className="text-3xl font-bold mb-3">Welcome back!</h2>
            <p className="opacity-90">You can sign in to access with your existing account.</p>
          </div>
        </div>

        {/* Right form */}
        <div className="p-8 md:p-12">
          <h3 className="text-xl font-semibold text-gray-800">Sign In</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Username or usernameOrEmail</label>
              <input value={formData.usernameOrEmail} name="usernameOrEmail" onChange={handleChange} className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input value={formData.password} name="password" onChange={handleChange} type="password" className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="********" />
              <div className="flex items-center justify-between mt-2 text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="form-checkbox h-4 w-4" />
                  <span>Remember me</span>
                </label>
                <a className="text-sm text-gray-500 hover:underline" href="#">Forgot password?</a>
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-md shadow disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              New here? <a href="signup" className="text-purple-600">Create an Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
