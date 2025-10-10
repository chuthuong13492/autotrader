import { ALL_CARS, type Car, PAGE_SIZE } from '@/features/dashboard/data/mock-data'


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const mockApi = {
  // Get cars with pagination
  async getCars(page: number = 1, pageSize: number = PAGE_SIZE, sort?: string): Promise<{
    data: Car[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }> {
    await delay(500) 
    
    let cars = [...ALL_CARS]
    
    // Apply sorting if specified
    if (sort) {
      cars = cars.sort((a, b) => {
        switch (sort) {
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
    
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const data = cars.slice(startIndex, endIndex)
    const total = cars.length
    const totalPages = Math.ceil(total / pageSize)
    
    return {
      data,
      total,
      page,
      pageSize,
      totalPages
    }
  },

  // Get car by ID
  async getCarById(id: string): Promise<Car | null> {
    await delay(300)
    
    const car = ALL_CARS.find(c => c.id === id)
    return car || null
  },

  // Search cars
  async searchCars(query: string, page: number = 1, pageSize: number = PAGE_SIZE, sort?: string): Promise<{
    data: Car[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }> {
    await delay(400)
    
    let filteredCars = ALL_CARS.filter(car => 
      car.make.toLowerCase().includes(query.toLowerCase()) ||
      car.model.toLowerCase().includes(query.toLowerCase()) ||
      car.dealer.toLowerCase().includes(query.toLowerCase())
    )
    
    // Apply sorting if specified
    if (sort) {
      filteredCars = [...filteredCars].sort((a, b) => {
        switch (sort) {
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
    
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const data = filteredCars.slice(startIndex, endIndex)
    const total = filteredCars.length
    const totalPages = Math.ceil(total / pageSize)
    
    return {
      data,
      total,
      page,
      pageSize,
      totalPages
    }
  },

  // Filter cars by criteria
  async filterCars(filters: {
    make?: string
    year?: number
    priceMin?: number
    priceMax?: number
    bodyType?: string
    transmission?: string
  }, page: number = 1, pageSize: number = PAGE_SIZE): Promise<{
    data: Car[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }> {
    await delay(600)
    
    let filteredCars = ALL_CARS
    
    if (filters.make) {
      filteredCars = filteredCars.filter(car => 
        car.make.toLowerCase() === filters.make!.toLowerCase()
      )
    }
    
    if (filters.year) {
      filteredCars = filteredCars.filter(car => car.year === filters.year)
    }
    
    if (filters.priceMin !== undefined) {
      filteredCars = filteredCars.filter(car => car.price >= filters.priceMin!)
    }
    
    if (filters.priceMax !== undefined) {
      filteredCars = filteredCars.filter(car => car.price <= filters.priceMax!)
    }
    
    if (filters.bodyType) {
      filteredCars = filteredCars.filter(car => 
        car.bodyType.toLowerCase() === filters.bodyType!.toLowerCase()
      )
    }
    
    if (filters.transmission) {
      filteredCars = filteredCars.filter(car => 
        car.transmission.toLowerCase() === filters.transmission!.toLowerCase()
      )
    }
    
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const data = filteredCars.slice(startIndex, endIndex)
    const total = filteredCars.length
    const totalPages = Math.ceil(total / pageSize)
    
    return {
      data,
      total,
      page,
      pageSize,
      totalPages
    }
  }
}
