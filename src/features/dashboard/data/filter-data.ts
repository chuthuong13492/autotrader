import { type Car, type TransmissionType } from './mock-data'

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
}

// Brand (Make, Model, Trim) Filter Data
export const brandFilterData = {
  makes: ['Toyota', 'Honda', 'Ford', 'BMW', 'Tesla'],
  models: {
    'Toyota': ['Corolla', 'Camry', 'RAV4'],
    'Honda': ['Accord', 'Civic', 'CR-V'],
    'Ford': ['F-150', 'Mustang', 'Escape'],
    'BMW': ['328i', 'X3'],
    'Tesla': ['Model 3']
  },
  trims: {
    'Corolla': ['LE', 'SE'],
    'Camry': ['SE', 'XLE'],
    'RAV4': ['XLE', 'Limited'],
    'Accord': ['Sport', 'Touring'],
    'Civic': ['EX', 'Sport'],
    'CR-V': ['EX', 'Touring'],
    'F-150': ['XLT', 'Lariat'],
    'Mustang': ['GT', 'EcoBoost'],
    'Escape': ['SE', 'Titanium'],
    '328i': ['Base', 'M Sport'],
    'X3': ['xDrive30i', 'M40i'],
    'Model 3': ['Standard', 'Long Range']
  }
}

// Price Range Filter Data
export const priceRangeFilterData = {
  min: 0,
  max: 100000,
  step: 1000,
  defaultMin: 0,
  defaultMax: 100000,
  presets: [
    { label: 'Under $10K', min: 0, max: 10000 },
    { label: '$10K - $20K', min: 10000, max: 20000 },
    { label: '$20K - $30K', min: 20000, max: 30000 },
    { label: '$30K - $40K', min: 30000, max: 40000 },
    { label: '$40K - $50K', min: 40000, max: 50000 },
    { label: 'Over $50K', min: 50000, max: 100000 }
  ]
}

// Body Type Filter Data
export const bodyTypeFilterData: Array<{
  value: string
  label: string
  icon: string
  description: string
}> = [
  {
    value: 'Sedan',
    label: 'Sedan',
    icon: '🚗',
    description: '4-door passenger car'
  },
  {
    value: 'SUV',
    label: 'SUV',
    icon: '🚙',
    description: 'Sport Utility Vehicle'
  },
  {
    value: 'Hatchback',
    label: 'Hatchback',
    icon: '🚗',
    description: 'Compact car with rear door'
  },
  {
    value: 'Coupe',
    label: 'Coupe',
    icon: '🏎️',
    description: '2-door sports car'
  }
]

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

// Additional Filter Data
export const additionalFilterData = {
  condition: [
    { value: 'New', label: 'New', description: 'Brand new vehicle' },
    { value: 'Used', label: 'Used', description: 'Previously owned vehicle' }
  ],
  yearRange: {
    min: 2020,
    max: 2025,
    step: 1,
    defaultMin: 2020,
    defaultMax: 2025
  },
  mileageRange: {
    min: 0,
    max: 100000,
    step: 1000,
    defaultMin: 0,
    defaultMax: 100000,
    presets: [
      { label: 'Under 25K miles', max: 25000 },
      { label: '25K - 50K miles', min: 25000, max: 50000 },
      { label: '50K - 75K miles', min: 50000, max: 75000 },
      { label: 'Over 75K miles', min: 75000 }
    ]
  },
  badges: [
    { value: 'Great Price', label: 'Great Price', color: 'green' },
    { value: 'No Accidents', label: 'No Accidents', color: 'blue' },
    { value: 'Electric', label: 'Electric', color: 'emerald' }
  ]
}


// Filter utility functions
export function applyFilters(cars: Car[], filters?: FilterState): Car[] {
  if (!filters) return cars

  return cars.filter(car => {
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
      const carText = `${car.make} ${car.model} ${car.trim}`.toLowerCase()
      if (!carText.includes(searchLower)) {
        return false
      }
    }
    
    return true
  })
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