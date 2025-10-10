import { type Car, type TransmissionType, ALL_CARS } from './mock-data'
import { type SortKey } from '@/stores/dashboard-slice'

// Filter State Interface
export interface FilterState {
  // Brand filters
  selectedMakes: string
  selectedModels: string
  selectedTrims: string
  
  // Price range
  priceMin: number
  priceMax: number
  
  // Body types
  selectedBodyTypes: string[]
  
  // Transmission
  selectedTransmission: TransmissionType | null
  
  // Additional filters
  // selectedConditions: string[]
  // yearMin: number
  // yearMax: number
  // mileageMin: number
  // mileageMax: number
  // selectedBadges: string[]
  
  // Search
  searchQuery: string
  
  // Sort
  sortKey?: SortKey
}

// Helper function to build brand data from ALL_CARS
function buildBrandData(cars: Car[]) {
  const makesSet = new Set<string>()
  const modelsMap = new Map<string, Set<string>>()
  const trimsMap = new Map<string, Set<string>>()

  for (const car of cars) {
    // makes
    if (car.make) {
      makesSet.add(car.make)
      // models per make
      if (car.model) {
        const modelsForMake = modelsMap.get(car.make) ?? new Set<string>()
        modelsForMake.add(car.model)
        modelsMap.set(car.make, modelsForMake)
      }
    }
    // trims per model
    if (car.model && car.trim) {
      const trimsForModel = trimsMap.get(car.model) ?? new Set<string>()
      trimsForModel.add(car.trim)
      trimsMap.set(car.model, trimsForModel)
    }
  }

  const makes = Array.from(makesSet).sort()
  const models: Record<string, string[]> = {}
  const trims: Record<string, string[]> = {}

  for (const [make, set] of modelsMap.entries()) {
    models[make] = Array.from(set).sort()
  }
  for (const [model, set] of trimsMap.entries()) {
    trims[model] = Array.from(set).sort()
  }

  return { makes, models, trims }
}

// Brand (Make, Model, Trim) Filter Data - dynamically generated from ALL_CARS
export const brandFilterData = buildBrandData(ALL_CARS)

// Year Filter Data - dynamically generated from ALL_CARS
export const yearFilterData = {
  years: Array.from(new Set(ALL_CARS.map(c => c.year)))
    .sort((a, b) => b - a) // Sort from newest to oldest
    .map(year => ({
      value: year.toString(),
      label: year.toString(),
      description: `${year} model year`
    }))
}

// Body Type Filter Data - dynamically generated from ALL_CARS
const bodyTypeIconMap: Record<string, string> = {
  Sedan: '🚗',
  SUV: '🚙',
  Hatchback: '🚗',
  Coupe: '🏎️',
  Truck: '🚚',
  Wagon: '🚐',
  Convertible: '🏎️',
}

export const bodyTypeFilterData: Array<{
  value: string
  label: string
  icon: string
  description: string
}> = Array.from(new Set(ALL_CARS.map(c => c.bodyType)))
  .sort()
  .map(value => ({
    value,
    label: value,
    icon: bodyTypeIconMap[value] ?? '🚘',
    description: value,
  }))

// Transmission Filter Data
export const transmissionFilterData: Array<{
  value: TransmissionType
  label: string
  description: string
}> = [
  {
    value: 'Automatic',
    label: 'Automatic',
    description: 'Automatic transmission'
  },
  {
    value: 'Manual',
    label: 'Manual',
    description: 'Manual transmission'
  }
]

// Additional Filter Data - dynamically generated from ALL_CARS
export const additionalFilterData = {
  condition: [
    { value: 'New', label: 'New', description: 'Brand new vehicle' },
    { value: 'Used', label: 'Used', description: 'Previously owned vehicle' }
  ],
  yearRange: {
    min: Math.min(...ALL_CARS.map(c => c.year)),
    max: Math.max(...ALL_CARS.map(c => c.year)),
    step: 1,
    defaultMin: Math.min(...ALL_CARS.map(c => c.year)),
    defaultMax: Math.max(...ALL_CARS.map(c => c.year))
  },
  mileageRange: {
    min: 0,
    max: Math.max(...ALL_CARS.map(c => c.mileage)),
    step: 1000,
    defaultMin: 0,
    defaultMax: Math.max(...ALL_CARS.map(c => c.mileage)),
    presets: [
      { label: 'Under 25K miles', max: 25000 },
      { label: '25K - 50K miles', min: 25000, max: 50000 },
      { label: '50K - 75K miles', min: 50000, max: 75000 },
      { label: 'Over 75K miles', min: 75000 }
    ]
  },
  // Badges dynamically generated from ALL_CARS
  badges: Array.from(new Set(ALL_CARS.flatMap(c => c.badges || [])))
    .sort()
    .map(badge => ({
      value: badge,
      label: badge,
      color: badge === 'Great Price' ? 'green' : 
             badge === 'No Accidents' ? 'blue' : 
             badge === 'Electric' ? 'emerald' : 
             badge === 'Hybrid' ? 'blue' : 'gray'
    }))
}

// Filter utility functions
// Sort function
function sortCars(cars: Car[], sortKey?: SortKey): Car[] {
  if (!sortKey || sortKey === 'relevance') return cars

  return [...cars].sort((a, b) => {
    switch (sortKey) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'year-asc':
        return a.year - b.year
      case 'year-desc':
        return b.year - a.year
      case 'mileage-asc':
        return a.mileage - b.mileage
      case 'mileage-desc':
        return b.mileage - a.mileage
      default:
        return 0
    }
  })
}

export function applyFilters(cars: Car[], filters?: FilterState): Car[] {
  if (!filters) return cars

  const filteredCars = cars.filter(car => {
    // Brand filters
    if (filters.selectedMakes && filters.selectedMakes !== car.make) {
      return false
    }
    if (filters.selectedModels && filters.selectedModels !== car.model) {
      return false
    }
    if (filters.selectedTrims && filters.selectedTrims !== car.trim) {
      return false
    }
    
    // Price range
    const minPrice = filters.priceMin ?? 0
    const maxPrice = filters.priceMax ?? Number.MAX_SAFE_INTEGER
    if (minPrice && car.price < minPrice) return false
    if (maxPrice && car.price > maxPrice) return false
    
    // Body type
    if (filters.selectedBodyTypes && filters.selectedBodyTypes.length > 0 && !filters.selectedBodyTypes.includes(car.bodyType)) {
      return false
    }
    
    // Transmission
    if (filters.selectedTransmission && car.transmission !== filters.selectedTransmission) {
      return false
    }
    
    // Search query
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase()
      const carText = `${car.make} ${car.model} ${car.trim} ${car.year}`.toLowerCase()
      if (!carText.includes(searchLower)) {
        return false
      }
    }
    
    return true
  })

  // Apply sorting
  return sortCars(filteredCars, filters.sortKey)
}

// // Get active filter count
// export function getActiveFilterCount(filters: FilterState): number {
//   let count = 0
  
//   if (filters.selectedMakes.length > 0) count++
//   if (filters.selectedModels.length > 0) count++
//   if (filters.selectedTrims.length > 0) count++
//   if (filters.priceMin !== priceRangeFilterData.defaultMin || filters.priceMax !== priceRangeFilterData.defaultMax) count++
//   if (filters.selectedBodyTypes.length > 0) count++
//   if (filters.selectedTransmission) count++
//   if (filters.selectedConditions.length > 0) count++
//   if (filters.yearMin !== additionalFilterData.yearRange.defaultMin || filters.yearMax !== additionalFilterData.yearRange.defaultMax) count++
//   if (filters.mileageMin !== additionalFilterData.mileageRange.defaultMin || filters.mileageMax !== additionalFilterData.mileageRange.defaultMax) count++
//   if (filters.selectedBadges.length > 0) count++
//   if (filters.searchQuery) count++
  
//   return count
// }