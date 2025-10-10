import { render, screen } from '@testing-library/react';
import { Filter, type FilterRef } from '../dashboard-filter';
import React, { act } from 'react';

// Mock the filter components
jest.mock('../filters/price-filter', () => ({
  PriceFilter: ({ className }: { className?: string }) => (
    <div data-testid="price-filter" className={className}>Price Filter</div>
  ),
}));

jest.mock('../filters/brand-filter', () => ({
  BrandFilter: ({ className }: { className?: string }) => (
    <div data-testid="brand-filter" className={className}>Brand Filter</div>
  ),
}));

jest.mock('../filters/body-type-filter', () => ({
  BodyTypeFilter: ({ className }: { className?: string }) => (
    <div data-testid="body-type-filter" className={className}>Body Type Filter</div>
  ),
}));

jest.mock('../filters/transmission-filter', () => ({
  TransmissionFilter: ({ className }: { className?: string }) => (
    <div data-testid="transmission-filter" className={className}>Transmission Filter</div>
  ),
}));

// Mock the UI components
jest.mock('@/components/ui/form', () => ({
  Form: ({ children }: { children: React.ReactNode }) => <div data-testid="form">{children}</div>,
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
}));

jest.mock('@/components/ui/separator', () => ({
  Separator: ({ orientation }: { orientation?: string }) => (
    <div data-testid="separator" data-orientation={orientation} />
  ),
}));

jest.mock('@/components/ui/collapsible', () => ({
  Collapsible: ({ children, defaultOpen }: { children: React.ReactNode; defaultOpen?: boolean }) => (
    <div data-testid="collapsible" data-default-open={defaultOpen}>{children}</div>
  ),
  CollapsibleTrigger: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button data-testid="collapsible-trigger" className={className}>{children}</button>
  ),
  CollapsibleContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="collapsible-content" className={className}>{children}</div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: ({ className }: { className?: string }) => (
    <div data-testid="chevron-down" className={className} />
  ),
}));

// No router/location hooks needed when testing `Filter` directly

const renderPlain = (ui?: React.ReactElement) => render(ui ?? <Filter />);

describe('DashboardFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter sections', () => {
    renderPlain();
    
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Body Type')).toBeInTheDocument();
    expect(screen.getByText('Transmission')).toBeInTheDocument();
  });

  it('renders all filter components', () => {
    renderPlain();
    
    expect(screen.getByTestId('price-filter')).toBeInTheDocument();
    expect(screen.getByTestId('brand-filter')).toBeInTheDocument();
    expect(screen.getByTestId('body-type-filter')).toBeInTheDocument();
    expect(screen.getByTestId('transmission-filter')).toBeInTheDocument();
  });

  it('renders all collapsible sections', () => {
    renderPlain();
    
    const collapsibles = screen.getAllByTestId('collapsible');
    expect(collapsibles).toHaveLength(4);
    
    collapsibles.forEach(collapsible => {
      expect(collapsible).toHaveAttribute('data-default-open', 'true');
    });
  });

  it('applies correct CSS classes to card', () => {
    renderPlain();
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(
      'hidden',
      'w-full',
      'max-w-[16rem]',
      'shrink-0',
      'self-start',
      'lg:block',
      'p-0'
    );
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-filter-class';
    renderPlain(<Filter className={customClass} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(customClass);
  });

  it('renders chevron down icons for all sections', () => {
    renderPlain();
    
    const chevronIcons = screen.getAllByTestId('chevron-down');
    expect(chevronIcons).toHaveLength(4);
    
    chevronIcons.forEach(icon => {
      expect(icon).toHaveClass(
        'h-4',
        'w-4',
        'transition-transform',
        'duration-200',
        'group-data-[state=open]:rotate-180'
      );
    });
  });

  it('has correct trigger button styling', () => {
    renderPlain();
    
    const triggers = screen.getAllByTestId('collapsible-trigger');
    expect(triggers).toHaveLength(4);
    
    triggers.forEach(trigger => {
      expect(trigger).toHaveClass(
        'flex',
        'items-center',
        'justify-between',
        'w-full',
        'p-4',
        'hover:bg-muted/50',
        'transition-colors'
      );
    });
  });

  it('can call submit via ref without errors', () => {
    const ref = React.createRef<FilterRef>()
  
    render(<Filter ref={ref} onFilterChange={jest.fn()} />)
  
    expect(() => {
      act(() => {
        ref.current?.submit()
      })
    }).not.toThrow()
  })

  it('exposes reset method through ref', () => {
    const ref = React.createRef<FilterRef>();
    renderPlain(<Filter ref={ref} />);
    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.reset).toBe('function');
  });

  it('renders form wrapper', () => {
    renderPlain();
    
    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
  });

  it('renders filter content with correct padding', () => {
    renderPlain();
    
    const priceFilter = screen.getByTestId('price-filter');
    expect(priceFilter).toHaveClass('p-4', 'pt-2');
    
    const brandFilter = screen.getByTestId('brand-filter');
    expect(brandFilter).toHaveClass('p-4', 'pt-2');
    
    const bodyTypeFilter = screen.getByTestId('body-type-filter');
    expect(bodyTypeFilter).toHaveClass('p-4', 'pt-2');
    
    const transmissionFilter = screen.getByTestId('transmission-filter');
    expect(transmissionFilter).toHaveClass('p-4', 'pt-2');
  });
});

