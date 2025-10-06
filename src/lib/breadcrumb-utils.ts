export interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

// Helper function to build URL with filters
export function buildFilterUrl(filters: {
  selectedMakes?: string
  selectedModels?: string
  selectedTrims?: string
  selectedBodyTypes?: string[]
  minPrice?: string
  maxPrice?: string
  selectedTransmission?: string
  search?: string
}): string {
  const params = new URLSearchParams()
  
  if (filters.search) params.set('value', filters.search)
  if (filters.minPrice) params.set('minPrice', filters.minPrice)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
  if (filters.selectedMakes) params.set('selectedMakes', filters.selectedMakes)
  if (filters.selectedModels) params.set('selectedModels', filters.selectedModels)
  if (filters.selectedTrims) params.set('selectedTrims', filters.selectedTrims)
  if (filters.selectedBodyTypes?.length) {
    filters.selectedBodyTypes.forEach(type => params.append('selectedBodyTypes', type))
  }
  if (filters.selectedTransmission && filters.selectedTransmission !== 'All') {
    params.set('selectedTransmission', filters.selectedTransmission)
  }
  
  const queryString = params.toString()
  return queryString ? `/search-result-page?${queryString}` : '/search-result-page'
}

// Helper function to build breadcrumb from URL params
export function buildBreadcrumbFromParams(searchParams: Record<string, unknown>): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: 'Cars for Sale',
      href: '/search-result-page'
    }
  ]

  // Add Make if in URL params
  if (searchParams.selectedMakes) {
    items.push({
      label: String(searchParams.selectedMakes),
      href: undefined
    })
  }

  // Add Model if in URL params
  if (searchParams.selectedModels) {
    items.push({
      label: String(searchParams.selectedModels),
      href: undefined
    })
  }

  // Add Trim if in URL params
  if (searchParams.selectedTrims) {
    items.push({
      label: String(searchParams.selectedTrims),
      href: undefined
    })
  }

  // Add Body Type if in URL params
  if (searchParams.selectedBodyTypes) {
    const bodyTypes = Array.isArray(searchParams.selectedBodyTypes) 
      ? searchParams.selectedBodyTypes.join(', ')
      : String(searchParams.selectedBodyTypes)
    items.push({
      label: bodyTypes,
      href: undefined
    })
  }

  // Mark last item as active
  if (items.length > 1) {
    items[items.length - 1].isActive = true
  }

  return items
}
