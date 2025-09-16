"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isAuthenticatedToken, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're not loading and user is not authenticated
    if (!isLoading && !isAuthenticated && !isAuthenticatedToken) {
      console.log('Redirecting to login - not authenticated')
      router.replace('/account/login')
    }
  }, [isAuthenticated, isAuthenticatedToken, isLoading, router])

  // Show loading while auth is being determined
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // If not authenticated after loading, don't render (will redirect)
  if (!isAuthenticated && !isAuthenticatedToken) {
    return null
  }

  return <>{children}</>
}
