# AutoTrader

A modern React-based vehicle marketplace application built with TypeScript, featuring advanced search, filtering, and vehicle detail views.

## 🚀 Features

- **Vehicle Search & Filtering**: Advanced search with filters for make, model, price range, year, body type, and transmission
- **Vehicle Details**: Comprehensive vehicle information with image gallery
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Redux Toolkit for global state management
- **Data Fetching**: TanStack Query for efficient data fetching and caching
- **Type Safety**: Full TypeScript support with strict type checking
- **Modern UI**: Built with Radix UI components and Lucide React icons

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Radix UI
- **State Management**: Redux Toolkit, Zustand
- **Data Fetching**: TanStack Query, Axios
- **Routing**: TanStack Router
- **Forms**: React Hook Form, Zod validation
- **Testing**: Jest, Testing Library
- **Development**: ESLint, Prettier, Knip

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd autotrader
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Start development server

```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run knip` | Check for unused code |

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Radix UI)
│   ├── layout/          # Layout components
│   └── data-table/      # Table components
├── features/            # Feature-based modules
│   ├── dashboard/       # Vehicle search & listing
│   ├── vehicle/         # Vehicle detail pages
│   └── errors/          # Error pages
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── routes/              # Route definitions
├── stores/              # State management
├── styles/              # Global styles
└── assets/              # Static assets
```

## 🔌 API Documentation

The application currently uses mock data for development and testing purposes.

### Mock API Endpoints

#### Get Cars
```typescript
GET /api/cars?page=1&pageSize=12&sort=price-asc
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 12)
- `sort` (optional): Sort by field (`price-asc`, `price-desc`, `year-asc`, `year-desc`, `mileage-asc`, `mileage-desc`)

**Response:**
```typescript
{
  data: Car[],
  total: number,
  page: number,
  pageSize: number,
  totalPages: number
}
```

#### Search Cars
```typescript
GET /api/cars/search?query=BMW&page=1&pageSize=12
```

#### Filter Cars
```typescript
GET /api/cars/filter?make=BMW&year=2023&priceMin=30000&priceMax=50000
```

**Filter Parameters:**
- `make`: Vehicle manufacturer
- `year`: Model year
- `priceMin`: Minimum price
- `priceMax`: Maximum price
- `bodyType`: Vehicle body type (Sedan, SUV, Hatchback, etc.)
- `transmission`: Transmission type (Automatic, Manual)

#### Get Car by ID
```typescript
GET /api/cars/:id
```

### Car Data Model

```typescript
interface Car {
  id: string
  year: number
  make: string
  model: string
  trim: string
  mileage: number // miles
  price: number // USD
  imageUrl: string
  condition: 'New' | 'Used'
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck' | 'Wagon' | 'Convertible'
  transmission: 'Automatic' | 'Manual'
  dealer: string
  badges?: string[]
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url_here
VITE_APP_TITLE=AutoTrader
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Component Structure

```typescript
// Component file structure
import React from 'react'
import { ComponentProps } from './types'

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### State Management

- Use Redux Toolkit for global state
- Use Zustand for simple local state
- Use React Query for server state

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

