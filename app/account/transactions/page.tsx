import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import TransactionsSection from '@/components/dashboard/TransactionsSection'

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Transactions">
        <TransactionsSection />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
