"use client"
import React from 'react'
import { AuthProvider } from '@/context/useAuth'

export default function AuthProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
