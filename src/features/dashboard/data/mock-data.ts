export type TransmissionType = 'Automatic' | 'Manual'

export type Car = {
  id: string
  year: number
  make: string
  model: string
  trim: string
  mileage: number // miles
  price: number // USD
  imageUrl: string
  condition: 'New' | 'Used'
  bodyType:  'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck' | 'Wagon'
  transmission: TransmissionType
  dealer: string
  badges?: string[]
}



// ---------- Mock Cars (30 items => 5 pages x 6 each) ----------
const IMG = (seed: number) => `https://picsum.photos/seed/car-${seed}/408/306`

export const ALL_CARS: Car[] = [
  { id: '1', year: 2017, make: 'Hyundai', model: 'Santa Fe', trim: 'Sport', mileage: 76000, price: 13588, imageUrl: IMG(1), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'San Francisco Toyota', badges: ['Great Price', 'No Accidents'] },
  { id: '2', year: 2025, make: 'Toyota', model: 'Corolla', trim: 'LE', mileage: 3000, price: 22988, imageUrl: IMG(2), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'San Francisco Toyota', badges: ['Certified', 'No Accidents'] },
  { id: '3', year: 2019, make: 'Chevrolet', model: 'Corvette', trim: 'Stingray', mileage: 2000, price: 49777, imageUrl: IMG(3), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Bay Area Motors', badges: ['Good Price'] },
  { id: '4', year: 2025, make: 'Honda', model: 'Accord', trim: 'Sport', mileage: 5, price: 35452, imageUrl: IMG(4), condition: 'New', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Livermore Honda', badges: ['Hybrid'] },
  { id: '5', year: 2025, make: 'Toyota', model: 'Camry', trim: 'SE', mileage: 10, price: 30565, imageUrl: IMG(5), condition: 'New', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: [] },
  { id: '6', year: 2018, make: 'Subaru', model: 'Outback', trim: '2.5i', mileage: 52000, price: 17990, imageUrl: IMG(6), condition: 'Used', bodyType: 'Wagon', transmission: 'Automatic', dealer: 'Peninsula Auto', badges: ['No Accidents'] },

  { id: '7', year: 2022, make: 'Tesla', model: 'Model 3', trim: 'Long Range', mileage: 12000, price: 32800, imageUrl: IMG(7), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'SF EV Center', badges: ['Electric'] },
  { id: '8', year: 2020, make: 'Ford', model: 'F-150', trim: 'XLT', mileage: 41000, price: 29950, imageUrl: IMG(8), condition: 'Used', bodyType: 'Truck', transmission: 'Automatic', dealer: 'Golden Gate Ford', badges: [] },
  { id: '9', year: 2016, make: 'BMW', model: '328i', trim: 'Base', mileage: 69000, price: 16800, imageUrl: IMG(9), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '10', year: 2021, make: 'Kia', model: 'Soul', trim: 'Ex', mileage: 21000, price: 16990, imageUrl: IMG(10), condition: 'Used', bodyType: 'Hatchback', transmission: 'Automatic', dealer: 'City Kia', badges: ['Great Price'] },
  { id: '11', year: 2023, make: 'Mazda', model: 'CX-5', trim: 'Touring', mileage: 9000, price: 27990, imageUrl: IMG(11), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Marin Mazda', badges: [] },
  { id: '12', year: 2015, make: 'Audi', model: 'A4', trim: 'Premium', mileage: 88000, price: 13990, imageUrl: IMG(12), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },

  { id: '13', year: 2018, make: 'Honda', model: 'Civic', trim: 'EX', mileage: 43000, price: 17500, imageUrl: IMG(13), condition: 'Used', bodyType: 'Sedan', transmission: 'Manual', dealer: 'Livermore Honda', badges: [] },
  { id: '14', year: 2019, make: 'Toyota', model: 'RAV4', trim: 'XLE', mileage: 38000, price: 25990, imageUrl: IMG(14), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: ['No Accidents'] },
  { id: '15', year: 2020, make: 'Volkswagen', model: 'Golf', trim: 'TSI', mileage: 25000, price: 18990, imageUrl: IMG(15), condition: 'Used', bodyType: 'Hatchback', transmission: 'Manual', dealer: 'Euro Auto SF', badges: [] },
  { id: '16', year: 2024, make: 'Ford', model: 'Mustang', trim: 'GT', mileage: 1000, price: 39990, imageUrl: IMG(16), condition: 'Used', bodyType: 'Coupe', transmission: 'Manual', dealer: 'Golden Gate Ford', badges: ['Great Price'] },
  { id: '17', year: 2017, make: 'Nissan', model: 'Altima', trim: 'SV', mileage: 72000, price: 12990, imageUrl: IMG(17), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Peninsula Auto', badges: [] },
  { id: '18', year: 2022, make: 'Hyundai', model: 'Tucson', trim: 'SEL', mileage: 14000, price: 23990, imageUrl: IMG(18), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'City Hyundai', badges: [] },

  { id: '19', year: 2016, make: 'Subaru', model: 'WRX', trim: 'Base', mileage: 64000, price: 20990, imageUrl: IMG(19), condition: 'Used', bodyType: 'Sedan', transmission: 'Manual', dealer: 'Peninsula Auto', badges: [] },
  { id: '20', year: 2021, make: 'Chevrolet', model: 'Tahoe', trim: 'LT', mileage: 23000, price: 47990, imageUrl: IMG(20), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Bay Area Motors', badges: [] },
  { id: '21', year: 2018, make: 'Honda', model: 'Fit', trim: 'EX', mileage: 51000, price: 14990, imageUrl: IMG(21), condition: 'Used', bodyType: 'Hatchback', transmission: 'Automatic', dealer: 'Livermore Honda', badges: [] },
  { id: '22', year: 2020, make: 'Toyota', model: 'Prius', trim: 'LE', mileage: 28000, price: 21990, imageUrl: IMG(22), condition: 'Used', bodyType: 'Hatchback', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: ['Hybrid'] },
  { id: '23', year: 2023, make: 'BMW', model: 'X3', trim: 'xDrive30i', mileage: 8000, price: 41990, imageUrl: IMG(23), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '24', year: 2015, make: 'Ford', model: 'Focus', trim: 'SE', mileage: 93000, price: 8990, imageUrl: IMG(24), condition: 'Used', bodyType: 'Hatchback', transmission: 'Manual', dealer: 'Golden Gate Ford', badges: ['Great Price'] },

  { id: '25', year: 2019, make: 'Kia', model: 'Sorento', trim: 'LX', mileage: 36000, price: 21950, imageUrl: IMG(25), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'City Kia', badges: [] },
  { id: '26', year: 2021, make: 'Hyundai', model: 'Elantra', trim: 'SEL', mileage: 18000, price: 18990, imageUrl: IMG(26), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'City Hyundai', badges: [] },
  { id: '27', year: 2017, make: 'Mazda', model: '3', trim: 'Touring', mileage: 60000, price: 12950, imageUrl: IMG(27), condition: 'Used', bodyType: 'Hatchback', transmission: 'Manual', dealer: 'Marin Mazda', badges: [] },
  { id: '28', year: 2022, make: 'Toyota', model: 'Highlander', trim: 'XLE', mileage: 15000, price: 38990, imageUrl: IMG(28), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: [] },
  { id: '29', year: 2016, make: 'Mercedes-Benz', model: 'C300', trim: 'Base', mileage: 70000, price: 20990, imageUrl: IMG(29), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '30', year: 2024, make: 'Nissan', model: 'Rogue', trim: 'SV', mileage: 5000, price: 27990, imageUrl: IMG(30), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Peninsula Auto', badges: [] },

  { id: '31', year: 2021, make: 'Toyota', model: 'GR Supra', trim: '3.0', mileage: 8000, price: 47900, imageUrl: IMG(31), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Bay Area Motors', badges: [] },
  { id: '32', year: 2019, make: 'Honda', model: 'CR-V', trim: 'EX', mileage: 34000, price: 24990, imageUrl: IMG(32), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Livermore Honda', badges: ['No Accidents'] },
  { id: '33', year: 2020, make: 'Toyota', model: 'Avalon', trim: 'Limited', mileage: 22000, price: 30990, imageUrl: IMG(33), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: [] },
  { id: '34', year: 2024, make: 'Hyundai', model: 'Kona', trim: 'N Line', mileage: 4000, price: 25990, imageUrl: IMG(34), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'City Hyundai', badges: [] },
  { id: '35', year: 2017, make: 'Ford', model: 'Explorer', trim: 'XLT', mileage: 78000, price: 19950, imageUrl: IMG(35), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Golden Gate Ford', badges: [] },
  { id: '36', year: 2022, make: 'Mazda', model: 'MX-5 Miata', trim: 'Club', mileage: 6000, price: 29990, imageUrl: IMG(36), condition: 'Used', bodyType: 'Coupe', transmission: 'Manual', dealer: 'Marin Mazda', badges: ['Great Price'] },
  { id: '37', year: 2018, make: 'Chevrolet', model: 'Bolt EV', trim: 'LT', mileage: 42000, price: 15990, imageUrl: IMG(37), condition: 'Used', bodyType: 'Hatchback', transmission: 'Automatic', dealer: 'Bay Area Motors', badges: ['Electric'] },
  { id: '38', year: 2016, make: 'Lexus', model: 'RX 350', trim: 'Base', mileage: 69000, price: 24950, imageUrl: IMG(38), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '39', year: 2023, make: 'Subaru', model: 'Crosstrek', trim: 'Premium', mileage: 7000, price: 26990, imageUrl: IMG(39), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Peninsula Auto', badges: [] },
  { id: '40', year: 2015, make: 'Honda', model: 'Pilot', trim: 'EX-L', mileage: 98000, price: 15990, imageUrl: IMG(40), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Livermore Honda', badges: [] },
  { id: '41', year: 2021, make: 'BMW', model: 'M340i', trim: 'xDrive', mileage: 15000, price: 46990, imageUrl: IMG(41), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '42', year: 2019, make: 'Audi', model: 'Q5', trim: 'Premium Plus', mileage: 33000, price: 31990, imageUrl: IMG(42), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '43', year: 2020, make: 'Nissan', model: 'Leaf', trim: 'SV', mileage: 19000, price: 16990, imageUrl: IMG(43), condition: 'Used', bodyType: 'Hatchback', transmission: 'Automatic', dealer: 'Peninsula Auto', badges: ['Electric'] },
  { id: '44', year: 2017, make: 'Toyota', model: 'Sienna', trim: 'XLE', mileage: 83000, price: 21990, imageUrl: IMG(44), condition: 'Used', bodyType: 'Wagon', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: [] },
  { id: '45', year: 2023, make: 'Ford', model: 'Bronco Sport', trim: 'Badlands', mileage: 9000, price: 32990, imageUrl: IMG(45), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Golden Gate Ford', badges: [] },
  { id: '46', year: 2018, make: 'Volkswagen', model: 'Tiguan', trim: 'SEL', mileage: 58000, price: 17990, imageUrl: IMG(46), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '47', year: 2024, make: 'Toyota', model: 'Prius Prime', trim: 'SE', mileage: 2000, price: 31990, imageUrl: IMG(47), condition: 'Used', bodyType: 'Hatchback', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: ['Hybrid'] },
  { id: '48', year: 2016, make: 'Chevrolet', model: 'Camaro', trim: 'SS', mileage: 54000, price: 28990, imageUrl: IMG(48), condition: 'Used', bodyType: 'Coupe', transmission: 'Manual', dealer: 'Bay Area Motors', badges: [] },
  { id: '49', year: 2022, make: 'Kia', model: 'K5', trim: 'GT-Line', mileage: 12000, price: 23990, imageUrl: IMG(49), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'City Kia', badges: [] },
  { id: '50', year: 2015, make: 'Toyota', model: 'Tacoma', trim: 'TRD Sport', mileage: 102000, price: 21990, imageUrl: IMG(50), condition: 'Used', bodyType: 'Truck', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: [] },
  { id: '51', year: 2023, make: 'Hyundai', model: 'Ioniq 5', trim: 'SEL', mileage: 7000, price: 34990, imageUrl: IMG(51), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'City Hyundai', badges: ['Electric'] },
  { id: '52', year: 2017, make: 'Mazda', model: '6', trim: 'Grand Touring', mileage: 67000, price: 14990, imageUrl: IMG(52), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Marin Mazda', badges: [] },
  { id: '53', year: 2020, make: 'Ford', model: 'Escape', trim: 'Titanium', mileage: 30000, price: 23950, imageUrl: IMG(53), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Golden Gate Ford', badges: [] },
  { id: '54', year: 2018, make: 'Subaru', model: 'Forester', trim: 'Limited', mileage: 56000, price: 19990, imageUrl: IMG(54), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Peninsula Auto', badges: [] },
  { id: '55', year: 2016, make: 'BMW', model: 'M2', trim: 'Base', mileage: 48000, price: 34990, imageUrl: IMG(55), condition: 'Used', bodyType: 'Coupe', transmission: 'Manual', dealer: 'Euro Auto SF', badges: [] },
  { id: '56', year: 2021, make: 'Chevrolet', model: 'Trailblazer', trim: 'LT', mileage: 19000, price: 20990, imageUrl: IMG(56), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Bay Area Motors', badges: [] },
  { id: '57', year: 2019, make: 'Nissan', model: 'Maxima', trim: 'SL', mileage: 37000, price: 21990, imageUrl: IMG(57), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Peninsula Auto', badges: [] },
  { id: '58', year: 2024, make: 'Toyota', model: 'Corolla Cross', trim: 'LE', mileage: 3000, price: 26990, imageUrl: IMG(58), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Livermore Toyota', badges: [] },
  { id: '59', year: 2018, make: 'Audi', model: 'A3', trim: 'Premium', mileage: 52000, price: 17990, imageUrl: IMG(59), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '60', year: 2022, make: 'Honda', model: 'HR-V', trim: 'EX', mileage: 11000, price: 22990, imageUrl: IMG(60), condition: 'Used', bodyType: 'SUV', transmission: 'Automatic', dealer: 'Livermore Honda', badges: [] },
]

export const PAGE_SIZE = 20
export const TOTAL = ALL_CARS.length
export const PAGE_COUNT = Math.max(1, Math.ceil(TOTAL / PAGE_SIZE))

// export const MOCK_PAGES: Pagination<Car>[] = Array.from({ length: PAGE_COUNT }, (_, i) => {
//   const page = i + 1
//   const start = i * PAGE_SIZE
//   const end = start + PAGE_SIZE
//   const list = ALL_CARS.slice(start, end)
//   return new Pagination<Car>({ list, page, pageSize: PAGE_SIZE, pageCount: PAGE_COUNT, total: TOTAL })
// })

// export function getMockPage(page: number): Pagination<Car> {
//   if (page < 1 || page > PAGE_COUNT) return Pagination.empty<Car>()
//   return MOCK_PAGES[page - 1]
// }

