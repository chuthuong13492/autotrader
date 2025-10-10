import { render, screen } from '@testing-library/react';
import { VehicleInfo, VehiclePrice } from '../vehicle-info';
import { ALL_CARS } from '@/features/dashboard/data/mock-data';

// Mock the Badge component
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) => (
    <span data-testid="badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  CircleDot: () => <div data-testid="circle-dot-icon" />,
  Gauge: () => <div data-testid="gauge-icon" />,
  Car: () => <div data-testid="car-icon" />,
  Cog: () => <div data-testid="cog-icon" />,
  Building2: () => <div data-testid="building-icon" />,
}));

describe('VehicleInfo', () => {
  const mockVehicle = ALL_CARS[0];

  it('renders vehicle information when vehicle is provided', () => {
    render(<VehicleInfo vehicle={mockVehicle} />);
    
    expect(screen.getByText(
      `${mockVehicle.condition} ${mockVehicle.year} ${mockVehicle.make} ${mockVehicle.model}${
        mockVehicle.trim ? ' ' + mockVehicle.trim : ''
      }`
    )).toBeInTheDocument();
  });

  it('renders vehicle title with trim when available', () => {
    const vehicleWithTrim = { ...mockVehicle, trim: 'Limited' };
    render(<VehicleInfo vehicle={vehicleWithTrim} />);
    
    expect(screen.getByText(
      `${vehicleWithTrim.condition} ${vehicleWithTrim.year} ${vehicleWithTrim.make} ${vehicleWithTrim.model} ${vehicleWithTrim.trim}`
    )).toBeInTheDocument();
  });

  it('does not render when vehicle is undefined', () => {
    const { container } = render(<VehicleInfo vehicle={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders vehicle specifications', () => {
    render(<VehicleInfo vehicle={mockVehicle} />);
    
    expect(screen.getByText('Mileage')).toBeInTheDocument();
    expect(screen.getByText(`${mockVehicle.mileage.toLocaleString()} miles`)).toBeInTheDocument();
    expect(screen.getByText('Transmission')).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.transmission)).toBeInTheDocument();
    expect(screen.getByText('Body Type')).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.bodyType)).toBeInTheDocument();
    expect(screen.getByText('Condition')).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.condition)).toBeInTheDocument();
    expect(screen.getByText('Dealer')).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.dealer)).toBeInTheDocument();
  });

  it('renders all specification icons', () => {
    render(<VehicleInfo vehicle={mockVehicle} />);
    
    expect(screen.getByTestId('gauge-icon')).toBeInTheDocument();
    expect(screen.getByTestId('cog-icon')).toBeInTheDocument();
    expect(screen.getByTestId('car-icon')).toBeInTheDocument();
    expect(screen.getByTestId('circle-dot-icon')).toBeInTheDocument();
    expect(screen.getByTestId('building-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-vehicle-info';
    render(<VehicleInfo vehicle={mockVehicle} className={customClass} />);
    
    const expectedTitle = `${mockVehicle.condition} ${mockVehicle.year} ${mockVehicle.make} ${mockVehicle.model}${
      mockVehicle.trim ? ' ' + mockVehicle.trim : ''
    }`;
    const container = screen.getByText(expectedTitle).closest('div');
    expect(container).toHaveClass(customClass);
  });

  it('has correct container classes', () => {
    render(<VehicleInfo vehicle={mockVehicle} />);
    
    const container = screen.getByText(
      `${mockVehicle.condition} ${mockVehicle.year} ${mockVehicle.make} ${mockVehicle.model}${
        mockVehicle.trim ? ' ' + mockVehicle.trim : ''
      }`
    ).closest('div');
    expect(container).toHaveClass('pt-4', 'space-y-4');
  });

  it('renders vehicle title with correct styling', () => {
    render(<VehicleInfo vehicle={mockVehicle} />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('text-2xl', 'font-extrabold', 'tracking-tight', 'text-foreground/90');
  });
});

describe('VehiclePrice', () => {
  const mockVehicle = ALL_CARS[0];

  it('renders vehicle price correctly', () => {
    render(<VehiclePrice vehicle={mockVehicle} />);
    
    expect(screen.getByText(`$${mockVehicle.price.toLocaleString()}`)).toBeInTheDocument();
  });

  it('renders badges when available', () => {
    const vehicleWithBadges = {
      ...mockVehicle,
      badges: ['Certified', 'Low Miles', 'One Owner']
    };
    
    render(<VehiclePrice vehicle={vehicleWithBadges} />);
    
    const badges = screen.getAllByTestId('badge');
    expect(badges).toHaveLength(3);
    expect(badges[0]).toHaveTextContent('Certified');
    expect(badges[1]).toHaveTextContent('Low Miles');
    expect(badges[2]).toHaveTextContent('One Owner');
  });

  it('does not render badges when not available', () => {
    const vehicleWithoutBadges = { ...mockVehicle, badges: undefined };
    render(<VehiclePrice vehicle={vehicleWithoutBadges} />);
    
    const badges = screen.queryAllByTestId('badge');
    expect(badges).toHaveLength(0);
  });

  it('does not render badges when empty array', () => {
    const vehicleWithEmptyBadges = { ...mockVehicle, badges: [] };
    render(<VehiclePrice vehicle={vehicleWithEmptyBadges} />);
    
    const badges = screen.queryAllByTestId('badge');
    expect(badges).toHaveLength(0);
  });

  it('renders badges with correct variant and styling', () => {
    const vehicleWithBadges = {
      ...mockVehicle,
      badges: ['Test Badge']
    };
    
    render(<VehiclePrice vehicle={vehicleWithBadges} />);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('data-variant', 'secondary');
    expect(badge).toHaveClass('text-sm', 'px-3', 'py-1');
  });

  it('formats price with commas for large numbers', () => {
    const vehicleWithHighPrice = {
      ...mockVehicle,
      price: 1234567
    };
    
    render(<VehiclePrice vehicle={vehicleWithHighPrice} />);
    
    expect(screen.getByText('$1,234,567')).toBeInTheDocument();
  });

  it('renders price with correct styling', () => {
    render(<VehiclePrice vehicle={mockVehicle} />);
    
    const priceElement = screen.getByText(`$${mockVehicle.price.toLocaleString()}`);
    expect(priceElement).toHaveClass('text-3xl', 'font-bold', 'text-foreground');
  });

  it('handles undefined vehicle gracefully', () => {
    render(<VehiclePrice vehicle={undefined} />);
    
    // Should not crash and should render empty container
    const container = screen.getByText('$0').closest('div');
    expect(container).toBeInTheDocument();
  });
});

