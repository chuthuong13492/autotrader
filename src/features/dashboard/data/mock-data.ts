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
  bodyType:  'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck' | 'Wagon' | 'Convertible'
  transmission: TransmissionType
  dealer: string
  badges?: string[]
}


export const CAR_IMAGES = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70", // 0
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d", // 1
  "https://images2.autotrader.com/hn/c/0c42fbd4da54493bbca94c3efc1ee8c8.jpg?format=auto&width=408&height=306", // 2 ✅
  "https://images.unsplash.com/photo-1493238792000-8113da705763", // 3
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7", // 4
  "https://images2.autotrader.com/hn/c/cb21b15ba4854a68aec864d270feef6f.jpg?format=auto&width=408&height=306", // 5 ✅
  "https://images2.autotrader.com/hn/c/5e481a9a5ddb40d3bb40b1c1fa7a1b6f.jpg?format=auto&width=408&height=306",     // 6
  "https://images2.autotrader.com/hn/c/f494480c3a824b67a0c6e4717d2222ce.jpg?format=auto&width=408&height=306", // 7 ✅
  "https://images2.autotrader.com/hn/c/2bc0b8d34af44761b8b7e499fd6ba868.jpg?format=auto&width=408&height=306", // 8 ✅
  "https://images2.autotrader.com/hn/c/ffa9e285737d447fa397aea5ed13d062.jpg?format=auto&width=408&height=306", // 9
  "https://images2.autotrader.com/hn/c/e50aba058fab433b9e4d176cde4d7548.jpg?format=auto&width=408&height=306", // 10 ✅
  "https://images2.autotrader.com/hn/c/0529463a672d4e68a373244eefb2c23a.jpg?format=auto&width=408&height=306", // 11 ✅
  "https://images2.autotrader.com/hn/c/09bd2677b7a44eec8bfb353a4a064b0c.jpg?format=auto&width=408&height=306", // 12 ✅
  "https://images2.autotrader.com/hn/c/9ecc0c1ef9844055852afa01f70364ed.jpg?format=auto&width=408&height=306", // 13 ✅
  "https://images2.autotrader.com/hn/c/871b931df0f347d0bbe88ac1fb402e42.jpg?format=auto&width=408&height=306", // 14
  "https://images2.autotrader.com/hn/c/9ecc0c1ef9844055852afa01f70364ed.jpg?format=auto&width=408&height=306", // 15 ✅
  "https://images2.autotrader.com/hn/c/21c1ac47bfd940c6b96d55a931eecc77.jpg?format=auto&width=408&height=306", // 16 ✅
  "https://images.unsplash.com/photo-1512499617640-c2f999098c1a", // 17
  "https://images2.autotrader.com/hn/c/5d2cf39c3b4d4acc81e9f91c130f841e.jpg?format=auto&width=408&height=306", // 18
  "https://images2.autotrader.com/hn/c/b634662539504db0867f2546908950c5.jpg?format=auto&width=408&height=306", // 19 ✅
  "https://images2.autotrader.com/hn/c/21c1ac47bfd940c6b96d55a931eecc77.jpg?format=auto&width=408&height=306", // 20 ✅
  "https://images.unsplash.com/photo-1549921296-3d5a6e1c7f45",     // 21
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",     // 22
  "https://images2.autotrader.com/hn/c/6a08e81dd9fc4547b06f413e402e7db5.jpg?format=auto&width=408&height=306", // 23 ✅
  "https://images2.autotrader.com/hn/c/2289cccc880c4840908754b4458afaac.jpg?format=auto&width=408&height=306", // 24 ✅
  "https://images2.autotrader.com/hn/c/c7e88f0fc98847fe9036d0082f2d92cc.jpg?format=auto&width=408&height=306", // 25 ✅
  "https://images.unsplash.com/photo-1600700159871-45a35d7ab696", // 26
  "https://images2.autotrader.com/hn/c/49e8cf6304f2427cae63797bf57048a8.jpg?format=auto&width=408&height=306", // 27 ✅
  "https://images.unsplash.com/photo-1502877338535-766e1452684a", // 28
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf", // 29
  "https://images2.autotrader.com/hn/c/22520209d8154804b245908a67a26b56.jpg?format=auto&width=408&height=306", // 30 ✅
  "https://images.unsplash.com/photo-1563720223185-11003d516935", // 31
  "https://images2.autotrader.com/hn/c/ebdebb78cc1041699f25aeaff64d4185.jpg?format=auto&width=408&height=306", // 32 ✅
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70", // 33
  "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023", // 34
  "https://images2.autotrader.com/hn/c/cd9a7e66b0104e7986b3cd47f29ea504.jpg?format=auto&width=408&height=306", // 35 ✅
  "https://images.unsplash.com/photo-1605184861740-5a64b57c6b12", // 36
  "https://images2.autotrader.com/hn/c/0eb941e863934141b9b2b12ae1da29df.jpg?format=auto&width=408&height=306", // 37 ✅
  "https://images2.autotrader.com/hn/c/4177af881f294c8b81a7b92279111130.jpg?format=auto&width=408&height=306", // 38 ✅
  "https://images2.autotrader.com/hn/c/ef573f1a63aa4048ac79368a67877516.jpg?format=auto&width=408&height=306", // 39 ✅
  "https://images2.autotrader.com/ps-vehicle-media/0a8945d3-f97f-486c-8d1a-80c7cac63662.jpeg?format=auto&width=408&height=306", // 40 ✅
  "https://images2.autotrader.com/ps-vehicle-media/fe5f349b-9474-44b3-af1b-23b0b89923dd.jpeg?format=auto&width=408&height=306", // 41 ✅
  "https://images.unsplash.com/photo-1502877338535-766e1452684a", // 42
  "https://images2.autotrader.com/hn/c/d44a320e9fd142e7944db8c716cdfb4b.jpg?format=auto&width=408&height=306", // 43 ✅
  "https://images.unsplash.com/photo-1563720223185-11003d516935", // 44
  "https://images2.autotrader.com/ps-vehicle-media/0ae1916e-c92b-4a8c-922b-f26ccd7e2f31.jpeg?format=auto&width=408&height=306", // 45 ✅
  "https://images.unsplash.com/photo-1549921296-3d5a6e1c7f45",     // 46
  "https://images2.autotrader.com/hn/c/2d62138cc2d84d2c82839faed1d8ab4c.jpg?format=auto&width=408&height=306", // 47 ✅
  "https://images2.autotrader.com/hn/c/9601b35e82e84d81a8ed296c97cbe666.jpg?format=auto&width=408&height=306", // 48 ✅
  "https://images2.autotrader.com/hn/c/c805bb771bc74bb598f4f7ab9435dd7d.jpg?format=auto&width=408&height=306", // 49 ✅
  "https://images2.autotrader.com/hn/c/c4b6d824a9ed49d09c5584a4e96a85b1.jpg?format=auto&width=408&height=306", // 50
  "https://images2.autotrader.com/hn/c/67304377137b4b5e9c70259219fd9d46.jpg?format=auto&width=408&height=306", // 51 ✅
  "https://images2.autotrader.com/hn/c/0e884efe1c3845a7801959c7f716b1a9.jpg?format=auto&width=408&height=306", // 52 ✅
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70", // 53
  "https://images2.autotrader.com/ps-vehicle-media/91f0bfb0-0ee6-4d40-8c7f-3cdd6e510c00.jpg?format=auto&width=408&height=306", // 54
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf", // 55
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7", // 56
  "https://images2.autotrader.com/hn/c/df9f2159677b4a3ea5974290680f3074.jpg?format=auto&width=408&height=306", // 57 ✅
  "https://images2.autotrader.com/ps-vehicle-media/91f0bfb0-0ee6-4d40-8c7f-3cdd6e510c00.jpg?format=auto&width=408&height=306",     // 58
  "https://images2.autotrader.com/hn/c/4e8393c8fa0c4940b8fa4a7e6e6d8a54.jpg?format=auto&width=408&height=306", // 59 ✅
];


export const IMG = (id: number) => CAR_IMAGES[(id - 1) % CAR_IMAGES.length];


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
];

export const PAGE_SIZE = 20
export const TOTAL = ALL_CARS.length
export const PAGE_COUNT = Math.max(1, Math.ceil(TOTAL / PAGE_SIZE))

export const SUGGESTION: Car[] = [
  { id: '101', year: 2024, make: 'Ferrari', model: 'SF90 Stradale', trim: 'Hybrid', mileage: 1200, price: 520000, imageUrl: IMG(101), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Exotic Motors SF', badges: ['Hybrid', 'No Accidents'] },
  { id: '102', year: 2023, make: 'Lamborghini', model: 'Aventador', trim: 'SVJ', mileage: 2000, price: 610000, imageUrl: IMG(102), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Luxury Garage', badges: ['Great Price'] },
  { id: '103', year: 2025, make: 'McLaren', model: 'Artura', trim: 'V6 Hybrid', mileage: 500, price: 310000, imageUrl: IMG(103), condition: 'New', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'McLaren San Jose', badges: ['Hybrid'] },
  { id: '104', year: 2022, make: 'Bugatti', model: 'Chiron', trim: 'Super Sport', mileage: 1500, price: 3100000, imageUrl: IMG(104), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Elite Auto', badges: ['No Accidents'] },
  { id: '105', year: 2023, make: 'Aston Martin', model: 'DBS', trim: 'Superleggera', mileage: 2200, price: 350000, imageUrl: IMG(99), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'British Luxury Cars', badges: [] },
  { id: '106', year: 2021, make: 'Porsche', model: '911 GT3', trim: 'Touring', mileage: 3000, price: 220000, imageUrl: IMG(106), condition: 'Used', bodyType: 'Coupe', transmission: 'Manual', dealer: 'Porsche San Francisco', badges: ['No Accidents'] },
  { id: '107', year: 2023, make: 'Lamborghini', model: 'Huracán', trim: 'EVO RWD', mileage: 1800, price: 280000, imageUrl: IMG(107), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Luxury Garage', badges: [] },
  { id: '108', year: 2024, make: 'Ferrari', model: 'Roma', trim: 'Twin-Turbo V8', mileage: 1000, price: 260000, imageUrl: IMG(108), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Ferrari Silicon Valley', badges: [] },
  { id: '109', year: 2025, make: 'Tesla', model: 'Roadster', trim: 'Plaid', mileage: 50, price: 250000, imageUrl: IMG(109), condition: 'New', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Tesla Store SF', badges: ['Electric'] },
  { id: '110', year: 2022, make: 'Koenigsegg', model: 'Jesko', trim: 'Absolut', mileage: 900, price: 2800000, imageUrl: IMG(110), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Supercar World', badges: [] },
  
  { id: '111', year: 2023, make: 'Porsche', model: 'Taycan Turbo S', trim: 'Performance', mileage: 5000, price: 195000, imageUrl: IMG(111), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Porsche San Francisco', badges: ['Electric'] },
  { id: '112', year: 2024, make: 'Lamborghini', model: 'Revuelto', trim: 'Hybrid V12', mileage: 300, price: 670000, imageUrl: IMG(112), condition: 'New', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Luxury Garage', badges: ['Hybrid'] },
  { id: '113', year: 2022, make: 'McLaren', model: '765LT', trim: 'Spider', mileage: 2500, price: 420000, imageUrl: IMG(113), condition: 'Used', bodyType: 'Convertible', transmission: 'Automatic', dealer: 'McLaren San Jose', badges: [] },
  { id: '114', year: 2021, make: 'Ferrari', model: '812 Superfast', trim: 'V12', mileage: 3500, price: 380000, imageUrl: IMG(114), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Ferrari Silicon Valley', badges: [] },
  { id: '115', year: 2024, make: 'Aston Martin', model: 'Vantage', trim: 'F1 Edition', mileage: 800, price: 230000, imageUrl: IMG(115), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'British Luxury Cars', badges: [] },
  { id: '116', year: 2023, make: 'Pagani', model: 'Huayra', trim: 'BC Roadster', mileage: 1000, price: 2900000, imageUrl: IMG(116), condition: 'Used', bodyType: 'Convertible', transmission: 'Automatic', dealer: 'Supercar World', badges: [] },
  { id: '117', year: 2025, make: 'Lotus', model: 'Emira', trim: 'First Edition', mileage: 400, price: 110000, imageUrl: IMG(117), condition: 'New', bodyType: 'Coupe', transmission: 'Manual', dealer: 'Lotus San Francisco', badges: [] },
  { id: '118', year: 2023, make: 'BMW', model: 'M8 Competition', trim: 'Gran Coupe', mileage: 7000, price: 145000, imageUrl: IMG(118), condition: 'Used', bodyType: 'Sedan', transmission: 'Automatic', dealer: 'Euro Auto SF', badges: [] },
  { id: '119', year: 2024, make: 'Porsche', model: '911 Turbo S', trim: 'Exclusive', mileage: 1500, price: 285000, imageUrl: IMG(119), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'Porsche San Francisco', badges: [] },
  { id: '120', year: 2023, make: 'Bentley', model: 'Continental GT', trim: 'Speed', mileage: 3500, price: 290000, imageUrl: IMG(120), condition: 'Used', bodyType: 'Coupe', transmission: 'Automatic', dealer: 'British Luxury Cars', badges: [] },
];