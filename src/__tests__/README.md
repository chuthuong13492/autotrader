# Testing Setup

This directory contains the test setup and configuration for the AutoTrader application.

## Test Framework

- **Jest**: JavaScript testing framework
- **React Testing Library**: Simple and complete React DOM testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM elements
- **@testing-library/user-event**: Utilities for simulating user interactions

## Configuration

### Jest Configuration (`jest.config.js`)
- Uses `ts-jest` preset for TypeScript support
- `jsdom` environment for DOM testing
- Module name mapping for `@/` imports
- Coverage collection from `src/**/*.{ts,tsx}`
- Test file patterns: `**/__tests__/**/*.(ts|tsx|js)` and `**/?(*.)(spec|test).(ts|tsx|js)`

### Setup Files
- `src/__tests__/setup.ts`: Global test setup and mocks
- `src/test-utils.tsx`: Custom render function with providers and test utilities

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are organized alongside the components they test:
```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── __tests__/
│   │       └── button.test.tsx
│   └── layout/
│       ├── dashboard-layout.tsx
│       └── __tests__/
│           └── dashboard-layout.test.tsx
└── features/
    ├── vehicle/
    │   └── components/
    │       ├── vehicle-detail-gallery.tsx
    │       └── __tests__/
    │           └── vehicle-detail-gallery.test.tsx
    └── dashboard/
        └── components/
            ├── car-card/
            │   ├── car-card.tsx
            │   └── __tests__/
            │       └── car-card.test.tsx
            └── __tests__/
                └── dashboard-filter.test.tsx
```

## Test Utilities

### Custom Render Function
The `test-utils.tsx` file provides a custom render function that includes necessary providers:

```tsx
import { render } from '@/test-utils';

// This automatically includes BrowserRouter and other providers
render(<MyComponent />);
```

### Mock Data
Common mock data is available in `test-utils.tsx`:
- `mockCar`: Sample car data
- `mockVehicle`: Sample vehicle data
- `createMockFormData()`: Helper for form data
- `createMockSearchParams()`: Helper for URL search params

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the user sees and does
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText`, etc. over `getByTestId`
3. **Mock External Dependencies**: Mock API calls, router functions, etc.
4. **Test Edge Cases**: Empty states, error states, loading states
5. **Keep Tests Simple**: One concept per test
6. **Use Descriptive Test Names**: Clear, specific test descriptions

## Common Patterns

### Testing Components with Router
```tsx
import { render } from '@/test-utils';

test('navigates on click', () => {
  render(<MyComponent />);
  // Test navigation behavior
});
```

### Testing Form Interactions
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('submits form with correct data', async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Assert form submission
});
```

### Testing Async Operations
```tsx
import { render, screen, waitFor } from '@testing-library/react';

test('loads data on mount', async () => {
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

## Coverage

The test suite aims for:
- **Statements**: > 80%
- **Branches**: > 70%
- **Functions**: > 80%
- **Lines**: > 80%

Run `npm run test:coverage` to see current coverage metrics.

