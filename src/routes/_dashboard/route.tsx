import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
})
