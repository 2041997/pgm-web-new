"use client"
import React, { useState, useRef } from 'react'
import { validateSignup, validateField, type SignupValues } from '@/lib/validation/signup'
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { register as registerService, verifyOtp as verifyOtpService, getProfile as getProfileService } from '@/services/api'

export default function SignUp() {
  const { isAuthenticated,
    login,
    logout,
    userData,
    setUserData,
    isAssociateData,
    setisAssociateData,
    isAuthenticatedToken,
    setIsAuthenticatedToken } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<SignupValues>(
    { name: '',
     emailorPhone: '',
     username: '',
     password: '',
     confirmPassword: '' 
    })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignupValues, string>>>({})
  const [awaitingOtp, setAwaitingOtp] = useState(false)
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''))
  const [otpError, setOtpError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const otpRefs = useRef<Array<HTMLInputElement | null>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    console.log("first", formData)
    const values = formData
    const res = validateSignup(values)
    setFieldErrors(res.errors)
    if (!res.valid) {
      setError('Please fix the highlighted fields')
      return
    }

    ;(async () => {
      try {
        const resp = await registerService(formData as any)
        if (resp?.success) {
          // If backend immediately returns tokens, treat as logged in
          if (resp.data && (resp as any).data.accessToken) {
            login((resp as any).data.accessToken)
            const profile = await getProfileService()
            if (profile?.success) setUserData(profile.data)
            router.push('/account/profile')
            return
          }

          // otherwise expect OTP sent
          setAwaitingOtp(true)
          setSuccess('OTP sent to your emailorPhone. Enter the 6-digit code below.')
        } else {
          setError(resp?.message || 'Registration failed')
        }
      } catch (err: any) {
        setError(err?.message || 'Registration error')
      }
    })()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    setFormData(updated)


    // validate this field with the latest values
    const f = validateField(name as keyof SignupValues, value, updated as SignupValues)
    setFieldErrors((prev) => ({ ...prev, [name]: f.error }))
  }

  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...otpDigits]
    next[index] = val
    setOtpDigits(next)
    if (val && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
      const next = [...otpDigits]
      next[index - 1] = ''
      setOtpDigits(next)
    }
  }

  const handleVerifyOtp = async () => {
    setOtpError('')
    setIsVerifying(true)
    try {
      const code = otpDigits.join('')
      if (code.length !== 6) {
        setOtpError('Enter the 6-digit code')
        setIsVerifying(false)
        return
      }
      const type = /^\d+$/.test(formData.emailorPhone) ? "phone" : "email";
      const resp = await verifyOtpService({ destination: formData.emailorPhone, otp: code, type: type })
      if (resp?.success) {
        console.log("first", resp)
        // If tokens provided, use auth context to finalize login
        const access = (resp as any).data?.accessToken
        if (access) {
          login(access)
          const profile = await getProfileService()
          if (profile?.success) setUserData(profile.data)
          router.push('/account/profile')
          return
        }

        setSuccess('Verification successful')
        setAwaitingOtp(false)
      } else {
        setOtpError(resp?.message || 'OTP verification failed')
      }
    } catch (err: any) {
      setOtpError(err?.message || 'Verification error')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="absolute inset-0 bg-[url('/loginbackhground.jpg')] bg-cover bg-center opacity-90" />
      <div className="w-full max-w-4xl z-10 bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        {/* Left hero with background image */}
        <div className="hidden md:flex items-center justify-center p-10 relative">
          <div className="absolute inset-0 bg-[url('/loginbackhground.jpg')] bg-cover bg-center opacity-90" />
          <div className="relative text-white max-w-xs">
            <h2 className="text-3xl font-bold mb-3">Join us</h2>
            <p className="opacity-90">Create an account to start shopping and manage your orders.</p>
          </div>
        </div>

        {/* Right form */}
        <div className="p-8 md:p-12">
          <h3 className="text-xl font-semibold text-gray-800">Sign Up</h3>
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Your full name" />
              {fieldErrors.name && <div className="text-xs text-red-600 mt-1">{fieldErrors.name}</div>}
            </div>

            <div>
              <label className="block text-sm text-gray-600">Email or Mobile Number</label>
              <input name="emailorPhone" value={formData.emailorPhone} onChange={handleChange} className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="you@example.com or 9123456789" />
              {fieldErrors.emailorPhone && <div className="text-xs text-red-600 mt-1">{fieldErrors.emailorPhone}</div>}
            </div>

            <div>
              <label className="block text-sm text-gray-600">Username</label>
              <input name="username" value={formData.username} onChange={handleChange} className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="choose a username" />
              {fieldErrors.username && <div className="text-xs text-red-600 mt-1">{fieldErrors.username}</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Password</label>
                <input name="password" value={formData.password} onChange={handleChange} type="password" className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Create password" />
                {fieldErrors.password && <div className="text-xs text-red-600 mt-1">{fieldErrors.password}</div>}
              </div>
              <div>
                <label className="block text-sm text-gray-600">Confirm Password</label>
                <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Confirm password" />
                {fieldErrors.confirmPassword && <div className="text-xs text-red-600 mt-1">{fieldErrors.confirmPassword}</div>}
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}

            {awaitingOtp && (
              <div className="pt-4">
                <label className="block text-sm text-gray-600">Enter OTP</label>
                <div className="flex gap-2 mt-2">
                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el }}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      className="w-10 h-10 text-center border rounded-md"
                      inputMode="numeric"
                    />
                  ))}
                </div>
                {otpError && <div className="text-xs text-red-600 mt-2">{otpError}</div>}
                <div className="mt-3">
                  <button type="button" onClick={handleVerifyOtp} disabled={isVerifying} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md">Verify OTP</button>
                </div>
              </div>
            )}

            <div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-md shadow">Create account</button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Already have an account? <a href="#" className="text-emerald-600">Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
