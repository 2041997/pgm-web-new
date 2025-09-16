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
  isLoading: boolean
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
  const [isLoading, setIsLoading] = useState<boolean>(true) // Add loading state

  useEffect(() => {
    // run only on client
    const initializeAuth = async () => {
      try {
        const token = getFromLocalStorage('token') || getFromLocalStorage('accessToken')
        const refreshTokenValue = getFromLocalStorage('refreshToken')
        const tempUserData = getFromLocalStorage('user') || null
        const isAuthenticationFlag = getFromLocalStorage('isAuthentication')

        if (token && (isAuthenticationFlag === 'true' || isAuthenticationFlag === true)) {
          try {
            // Try to verify token by fetching profile
            const profileResult = await getProfile(tempUserData.id, token)
            if (profileResult?.success && profileResult.data) {
              setIsAuthenticatedToken(token)
              setIsAuthenticated(true)
              setUserData(profileResult.data || tempUserData)
              // Keep any existing associateUser stored
              const existingAssoc = getFromLocalStorage('associateUser') || null
              setisAssociateData(existingAssoc)
              console.log('Auth restored successfully')
            } else {
              // Attempt refresh using the available refreshTokenService
              if (refreshTokenValue) {
                console.log('Attempting token refresh')
                const refreshResult = await refreshTokenService({ refreshToken: refreshTokenValue })
                if (refreshResult?.success && refreshResult.data) {
                  const newToken = refreshResult.data.accessToken ?? null
                  if (newToken) {
                    // Update both token formats for compatibility
                    setToLocalStorage('token', newToken)
                    setToLocalStorage('accessToken', newToken)
                    setIsAuthenticatedToken(newToken)
                    // try to fetch profile again
                    const newProfile = await getProfile(newToken)
                    setUserData(newProfile?.data ?? tempUserData)
                    setIsAuthenticated(true)
                    console.log('Token refreshed successfully')
                  } else {
                    console.log('Refresh failed - no new token')
                    clearAuthData()
                  }
                } else {
                  console.log('Refresh request failed')
                  clearAuthData()
                }
              } else {
                console.log('No refresh token available')
                clearAuthData()
              }
            }
          } catch (err) {
            console.error('Auth initialization error:', err)
            clearAuthData()
          }
        } else {
          console.log('No valid token or auth flag found')
          // Clear auth data but preserve other localStorage items
          clearAuthData()
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err)
        clearAuthData()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
    
    // Listen for storage changes to sync auth across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAuthentication' || e.key === 'token' || e.key === 'accessToken') {
        console.log('Storage change detected:', e.key, e.newValue)
        
        // If auth was removed in another tab, logout here
        if (e.key === 'isAuthentication' && e.newValue !== 'true') {
          console.log('Auth removed in another tab, clearing auth data')
          clearAuthData()
        }
        
        // If token was added in another tab, initialize auth
        if ((e.key === 'token' || e.key === 'accessToken') && e.newValue && getFromLocalStorage('isAuthentication') === 'true') {
          console.log('Token added in another tab, initializing auth')
          initializeAuth()
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = (token: string) => {
    console.log('Login called with token:', !!token)
    setIsAuthenticated(true)
    setIsAuthenticatedToken(token)
    // Store in both formats for compatibility
    setToLocalStorage('token', token)
    setToLocalStorage('accessToken', token)
    setToLocalStorage('isAuthentication', 'true')
  }

  const logout = () => {
    console.log('User logout - clearing all data including cart')
    setIsAuthenticated(false)
    setUserData(null)
    setisAssociateData(null)
    setIsAuthenticatedToken(null)
    
    // Clear all data including cart when user intentionally logs out
    removeFromLocalStorage('token')
    removeFromLocalStorage('accessToken')
    removeFromLocalStorage('refreshToken')
    removeFromLocalStorage('user')
    removeFromLocalStorage('associateUser')
    removeFromLocalStorage('isAuthentication')
    removeFromLocalStorage('cartItems')
  }

  const clearAuthData = () => {
    console.log('Clearing auth data only')
    setIsAuthenticated(false)
    setUserData(null)
    setisAssociateData(null)
    setIsAuthenticatedToken(null)
    
    // Clear only auth-related storage, preserve everything else
    removeFromLocalStorage('token')
    removeFromLocalStorage('accessToken')
    removeFromLocalStorage('refreshToken')
    removeFromLocalStorage('user')
    removeFromLocalStorage('associateUser')
    removeFromLocalStorage('isAuthentication')
  }

  const value: AuthContextValue = {
    isAuthenticated,
    isLoading,
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
