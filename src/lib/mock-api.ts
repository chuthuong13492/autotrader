import type { Pagination } from '@/components/layout/data/pagination'
import { ALL_CARS, type Car, PAGE_SIZE } from '@/features/dashboard/data/mock-data'


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const mockApi = {
  // Get car by ID
  async getCarById(id?: string): Promise<Car | null> {
    await delay(300)
    
    const car = ALL_CARS.find(c => c.id === id)
    return car || null
  },  

  // Filter cars by criteria (includes search functionality)
  async filterCars(filters: {
    searchQuery?: string
    selectedMakes?: string
    selectedModels?: string
    selectedTrims?: string
    year?: number
    priceMin?: number
    priceMax?: number
    selectedBodyTypes?: string[]
    bodyType?: string
    selectedTransmission?: string
    transmission?: string
    sortKey?: string
  }, page: number = 1, pageSize: number = PAGE_SIZE): Promise<Pagination<Car>> {
    await delay(500)
    
    let filteredCars = [...ALL_CARS]
    
    // Apply filters using same logic as applyFilters function
    filteredCars = filteredCars.filter(car => {
      // Brand filters (selectedMakes, selectedModels, selectedTrims)
      if (filters.selectedMakes && filters.selectedMakes !== car.make) {
        return false
      }
      if (filters.selectedModels && filters.selectedModels !== car.model) {
        return false
      }
      if (filters.selectedTrims && filters.selectedTrims !== car.trim) {
        return false
      }
      
      // Year filter
      if (filters.year && car.year !== filters.year) {
        return false
      }
      
      // Price range filters
      const minPrice = filters.priceMin ?? 0
      const maxPrice = filters.priceMax ?? Number.MAX_SAFE_INTEGER
      if (car.price < minPrice) return false
      if (car.price > maxPrice) return false
      
      // Body type filters (array support)
      if (filters.selectedBodyTypes && filters.selectedBodyTypes.length > 0 && !filters.selectedBodyTypes.includes(car.bodyType)) {
        return false
      }
      
      // Legacy body type filter (for backward compatibility)
      if (filters.bodyType && car.bodyType.toLowerCase() !== filters.bodyType.toLowerCase()) {
        return false
      }
      
      // Transmission filters
      if (filters.selectedTransmission && car.transmission !== filters.selectedTransmission) {
        return false
      }
      
      // Legacy transmission filter (for backward compatibility)
      if (filters.transmission && car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) {
        return false
      }
      
      // Search query (same logic as applyFilters)
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase()
        const carText = `${car.make} ${car.model} ${car.trim} ${car.year}`.toLowerCase()
        if (!carText.includes(searchLower)) {
          return false
        }
      }
      
      
      return true
    })
    
    if (filters.sortKey) {
      filteredCars = filteredCars.sort((a, b) => {
        switch (filters.sortKey) {
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
          case 'relevance':
          default:
            return 0 
        }
      })
    }

    const total = filteredCars.length;
    const pageCount = Math.ceil(total / pageSize);
    const currentPage = Math.min(Math.max(page, 1), pageCount);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const list = filteredCars.slice(start, end);
    
    return {
      list,
      page: currentPage,
      pageSize,
      pageCount,
      total,
    };
  }
}
