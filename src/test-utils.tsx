import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

// Custom render function that includes a minimal TanStack Router
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const rootRoute = createRootRoute();

  const TestComponent = () => ui;

  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: TestComponent,
  });

  const routeTree = rootRoute.addChildren([testRoute]);
  const router = createRouter({ routeTree });

  return render(<RouterProvider router={router} />, options);
};

// Backwards-compat: keep named helper for explicit router rendering when needed
export const renderWithRouter = customRender;

// Mock data for testing
export const mockCar = {
  id: 'test-car-1',
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  trim: 'LE',
  condition: 'Used',
  mileage: 25000,
  price: 25000,
  transmission: 'Automatic' as const,
  bodyType: 'Sedan',
  dealer: 'Test Dealer',
  imageUrl: 'https://example.com/car.jpg',
  badges: ['Certified', 'Low Miles'],
};

export const mockVehicle = {
  ...mockCar,
  features: ['Bluetooth', 'Backup Camera', 'Cruise Control'],
  description: 'A reliable and fuel-efficient sedan.',
  location: 'Test City, Test State',
  vin: '1HGBH41JXMN109186',
  color: 'Silver',
  fuelType: 'Gasoline',
  engine: '2.5L 4-Cylinder',
  drivetrain: 'FWD',
};

// Helper functions for testing
export const createMockFormData = (overrides = {}) => ({
  minPrice: '10000',
  maxPrice: '50000',
  selectedMakes: 'Toyota',
  selectedModels: 'Camry',
  selectedTrims: 'LE',
  selectedBodyTypes: ['Sedan'],
  selectedTransmission: 'Automatic' as const,
  ...overrides,
});

export const createMockSearchParams = (overrides = {}) => ({
  minPrice: 10000,
  maxPrice: 50000,
  selectedMakes: 'Toyota',
  selectedModels: 'Camry',
  selectedTrims: 'LE',
  selectedBodyTypes: ['Sedan'],
  selectedTransmission: 'Automatic' as const,
  ...overrides,
});

// Re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };

