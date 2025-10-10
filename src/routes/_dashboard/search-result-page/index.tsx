import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { Dashboard } from '@/features/dashboard'

const searchSchema = z.object({
  value: z.string().optional().catch(''),
  minPrice: z.coerce.number().optional().catch(undefined),
  maxPrice: z.coerce.number().optional().catch(undefined),
  selectedMakes: z.string().optional().catch(undefined),
  selectedModels: z.string().optional().catch(undefined),
  selectedTrims: z.string().optional().catch(undefined),
  selectedBodyTypes: z.array(z.string()).optional().catch([]),
  selectedTransmission: z.string().optional().catch('All'),
  sort: z.enum([
    'relevance',
    'price-asc',
    'price-desc',
    'year-asc',
    'year-desc',
    'mileage-asc',
    'mileage-desc'
  ]).optional().catch('relevance'),
})

export const Route = createFileRoute('/_dashboard/search-result-page/')({
  validateSearch: searchSchema,
  shouldReload: false,
  component: Dashboard,
})