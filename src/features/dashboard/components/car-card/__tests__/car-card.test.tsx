import { render, screen, fireEvent } from '@testing-library/react';
import { CarCard } from '../car-card';
import { ALL_CARS } from '@/features/dashboard/data/mock-data';

// Mock the BaseImage component
jest.mock('@/components/ui/base-image', () => ({
  BaseImage: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="car-image" />
  ),
}));

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock('@tanstack/react-router', () => ({
  ...jest.requireActual('@tanstack/react-router'),
  useNavigate: () => mockNavigate,
}));

const renderPlain = (ui: React.ReactElement) => render(ui);

describe('CarCard', () => {
  const mockCar = ALL_CARS[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders car information correctly', () => {
    renderPlain(<CarCard car={mockCar} />);

    // Kiểm tra text linh hoạt (tránh lỗi spacing / HTML split)
    expect(
      screen.getByText(new RegExp(`${mockCar.year}.*${mockCar.make}.*${mockCar.model}`, 'i'))
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(`${mockCar.trim}.*${mockCar.mileage.toLocaleString()}.*mi`, 'i'))
    ).toBeInTheDocument();

    expect(screen.getByText(`$${mockCar.price.toLocaleString()}`)).toBeInTheDocument();
  });

  it('renders car image with correct attributes', () => {
    renderPlain(<CarCard car={mockCar} />);

    const image = screen.getByTestId('car-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCar.imageUrl);
    expect(image).toHaveAttribute('alt', `${mockCar.make} ${mockCar.model}`);
    expect(image).toHaveClass('aspect-[408/306]', 'rounded-md');
  });

  it('navigates to vehicle detail page when clicked', () => {
    renderPlain(<CarCard car={mockCar} />);
  
    const card = screen.getByTestId('car-image').closest('div');
    fireEvent.click(card!);
  
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/vehicle/$id',
      params: { id: mockCar.id },
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-card-class';
    renderPlain(<CarCard car={mockCar} className={customClass} />);

    const card = screen.getByTestId('car-image').closest('div');
    expect(card).toHaveClass(customClass);
  });

  it('has correct styling classes', () => {
    renderPlain(<CarCard car={mockCar} />);

    const card = screen.getByTestId('car-image').closest('div');
    expect(card).toHaveClass(
      'rounded-md',
      'shadow',
      'hover:shadow-md',
      'cursor-pointer',
      'transition-all',
      'duration-300',
      'ease-out'
    );
  });

  it('formats price with commas correctly', () => {
    const carWithHighPrice = {
      ...mockCar,
      price: 1234567
    };

    renderPlain(<CarCard car={carWithHighPrice} />);

    expect(screen.getByText('$1,234,567')).toBeInTheDocument();
  });

  it('formats mileage with commas correctly', () => {
    const carWithHighMileage = {
      ...mockCar,
      mileage: 123456
    };

    renderPlain(<CarCard car={carWithHighMileage} />);

    expect(screen.getByText(`${mockCar.trim} • 123,456 mi`)).toBeInTheDocument();
  });

  it('renders all car details in correct order', () => {
    renderPlain(<CarCard car={mockCar} />);

    const cardContent = screen.getByTestId('car-image').closest('div')?.querySelector('.p-3');
    const children = cardContent?.children;

    if (children) {
      // First child should be the title
      expect(children[0]).toHaveTextContent(`${mockCar.year} ${mockCar.make} ${mockCar.model}`);
      // Second child should be the details
      expect(children[1]).toHaveTextContent(`${mockCar.trim} • ${mockCar.mileage.toLocaleString()} mi`);
      // Third child should be the price
      expect(children[2]).toHaveTextContent(`$${mockCar.price.toLocaleString()}`);
    }
  });

  it('handles click events with proper accessibility', () => {
    renderPlain(<CarCard car={mockCar} />);

    const card = screen.getByTestId('car-image').closest('div');
    expect(card).toHaveClass('cursor-pointer');

    // Test that the card is clickable
    fireEvent.click(card!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('displays car make and model in image alt text', () => {
    const testCar = {
      ...mockCar,
      make: 'Toyota',
      model: 'Camry'
    };

    renderPlain(<CarCard car={testCar} />);

    const image = screen.getByTestId('car-image');
    expect(image).toHaveAttribute('alt', 'Toyota Camry');
  });
});

