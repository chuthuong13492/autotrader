import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { Dashboard } from '@/features/dashboard'

const searchSchema = z.object({
  type: z.enum(['all', 'connected', 'notConnected']).optional().catch(undefined),
  filter: z.string().optional().catch(''),
  sort: z.enum(['asc', 'desc']).optional().catch(undefined),
})

export const Route = createFileRoute('/_authenticated/search-result/')({
  validateSearch: searchSchema,
  component: Dashboard,
})

