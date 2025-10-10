import { createFileRoute } from '@tanstack/react-router'
import { VehicleDetailPage } from '@/features/vehicle'

export const Route = createFileRoute('/_dashboard/vehicle/$id')({
  component: VehicleDetailPage,
})
