"use client"
import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import ProfileSection from '@/components/dashboard/ProfileSection'

export default function ProfilePage() {
  return (
    <DashboardLayout title="Profile">
      <ProfileSection />
    </DashboardLayout>
  )
}