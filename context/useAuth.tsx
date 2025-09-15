"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// Inline small localStorage helpers to avoid missing helper module
const getFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  const v = localStorage.getItem(key)
  if (!v) return null
  try {
    return JSON.parse(v)
  } catch {
    return v
  }
}
const setToLocalStorage = (key: string, value: any) => {
    console.log(typeof window)
  if (typeof window === 'undefined') return
  try {
    const v = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, v)
  } catch {}
}
const removeFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}

// Use the existing API services (userService exports) to verify/refresh tokens
import { refreshToken as refreshTokenService, getProfile } from '@/services/api'

type AuthContextValue = {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  userData: any
  setUserData: (ud: any) => void
  isAssociateData: any
  setisAssociateData: (v: any) => void
  isAuthenticatedToken: string | null
  setIsAuthenticatedToken: (t: string | null) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>(null)
  const [isAssociateData, setisAssociateData] = useState<any>(null)
  const [isAuthenticatedToken, setIsAuthenticatedToken] = useState<string | null>(null)

  useEffect(() => {
    // run only on client
    const initializeAuth = async () => {
      const token = getFromLocalStorage('token')
      const tempUserData = getFromLocalStorage('user') || null
      let checkUserAssociateData = null

      if (token) {
        try {
          // Try to verify token by fetching profile
          const profileResult = await getProfile()
          if (profileResult?.success && profileResult.data) {
            setIsAuthenticatedToken(token)
            setIsAuthenticated(true)
            setUserData(profileResult.data || tempUserData)
            // No associate fetch available here; keep any existing associateUser stored
            const existingAssoc = getFromLocalStorage('associateUser') || null
            setisAssociateData(existingAssoc)
          } else {
            // Attempt refresh using the available refreshTokenService
            const refreshResult = await refreshTokenService({ refreshToken: getFromLocalStorage('refreshToken') })
            if (refreshResult?.success && refreshResult.data) {
              const newToken = refreshResult.data.accessToken ?? null
              if (newToken) {
                setToLocalStorage('token', newToken)
                setIsAuthenticatedToken(newToken)
                // try to fetch profile again
                const newProfile = await getProfile()
                setUserData(newProfile?.data ?? tempUserData)
                setIsAuthenticated(true)
              } else {
                logout()
              }
            } else {
              logout()
            }
          }
        } catch (err) {
          logout()
        }
      }
    }

    initializeAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = (token: string) => {
    setIsAuthenticated(true)
    setToLocalStorage('token', token)
    setIsAuthenticatedToken(token)
  }

  const logout = () => {
    setIsAuthenticated(false)
    removeFromLocalStorage('token')
    removeFromLocalStorage('cartItems')
    setIsAuthenticatedToken(null)
    // router.push('/') // optionally navigate after logout
  }

  const value: AuthContextValue = {
    isAuthenticated,
    login,
    logout,
    userData,
    setUserData,
    isAssociateData,
    setisAssociateData,
    isAuthenticatedToken,
    setIsAuthenticatedToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
