import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import OrdersSection from '@/components/dashboard/OrdersSection'

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Orders">
        <OrdersSection />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
