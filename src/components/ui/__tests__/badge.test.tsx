import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    expect(badge.tagName).toBe('SPAN');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary Badge</Badge>);
    let badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');

    rerender(<Badge variant="destructive">Destructive Badge</Badge>);
    badge = screen.getByText('Destructive Badge');
    expect(badge).toHaveClass('bg-destructive', 'text-white');

    rerender(<Badge variant="outline">Outline Badge</Badge>);
    badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('text-foreground');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge-class">Custom Badge</Badge>);
    
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-badge-class');
  });

  it('renders as child component when asChild is true', () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>
    );
    
    const link = screen.getByRole('link', { name: /link badge/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('has correct data-slot attribute', () => {
    render(<Badge>Test Badge</Badge>);
    
    const badge = screen.getByText('Test Badge');
    expect(badge).toHaveAttribute('data-slot', 'badge');
  });

  it('applies base classes correctly', () => {
    render(<Badge>Base Badge</Badge>);
    
    const badge = screen.getByText('Base Badge');
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'border',
      'px-2',
      'py-0.5',
      'text-xs',
      'font-medium',
      'w-fit',
      'whitespace-nowrap',
      'shrink-0'
    );
  });

  it('handles focus states correctly', () => {
    render(<Badge>Focus Badge</Badge>);
    
    const badge = screen.getByText('Focus Badge');
    expect(badge).toHaveClass('focus-visible:border-ring', 'focus-visible:ring-ring/50');
  });

  it('supports all HTML span attributes', () => {
    render(
      <Badge 
        id="test-badge"
        data-testid="custom-badge"
        title="Test Title"
      >
        Attribute Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('custom-badge');
    expect(badge).toHaveAttribute('id', 'test-badge');
    expect(badge).toHaveAttribute('title', 'Test Title');
  });

  it('handles aria-invalid states', () => {
    render(<Badge aria-invalid="true">Invalid Badge</Badge>);
    
    const badge = screen.getByText('Invalid Badge');
    expect(badge).toHaveClass('aria-invalid:ring-destructive/20');
  });

  it('renders with SVG icons when provided', () => {
    render(
      <Badge>
        <svg data-testid="test-icon" />
        Badge with Icon
      </Badge>
    );
    
    const badge = screen.getByText('Badge with Icon');
    const icon = screen.getByTestId('test-icon');
    
    expect(badge).toHaveClass('[&>svg]:size-3', '[&>svg]:pointer-events-none');
    expect(icon).toBeInTheDocument();
  });

  it('has correct transition classes', () => {
    render(<Badge>Transition Badge</Badge>);
    
    const badge = screen.getByText('Transition Badge');
    expect(badge).toHaveClass('transition-[color,box-shadow]');
  });

  it('handles overflow correctly', () => {
    render(<Badge>Overflow Badge</Badge>);
    
    const badge = screen.getByText('Overflow Badge');
    expect(badge).toHaveClass('overflow-hidden');
  });

  it('maintains proper spacing with gap', () => {
    render(
      <Badge>
        <span>Icon</span>
        <span>Text</span>
      </Badge>
    );
    
    const badge = screen.getByText('Icon').closest('[data-slot="badge"]');
    expect(badge).toHaveClass('gap-1');
  });
});

