import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { Dashboard } from '@/features/dashboard'

const searchSchema = z.object({
  value: z.string().optional().catch(''),
  minPrice: z.coerce.number().optional().catch(undefined),
  maxPrice: z.coerce.number().optional().catch(undefined),
  selectedMakes: z.array(z.string()).optional().catch([]),
  selectedModels: z.array(z.string()).optional().catch([]),
  selectedTrims: z.array(z.string()).optional().catch([]),
  selectedBodyTypes: z.array(z.string()).optional().catch([]),
  selectedTransmission: z.string().optional().catch('All'),
  sort: z.enum(['asc', 'desc']).optional().catch(undefined),
})

export const Route = createFileRoute('/_dashboard/search-result-page/')({
  validateSearch: searchSchema,
  component: Dashboard,
})

