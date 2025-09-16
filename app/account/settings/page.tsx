import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import SettingsSection from '@/components/dashboard/SettingsSection'

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Settings">
        <SettingsSection />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
