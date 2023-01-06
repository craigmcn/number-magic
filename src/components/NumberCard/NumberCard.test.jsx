import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import NumberCard from './NumberCard';

const numbers = [1, 2, 3, 4, 5];

describe('NumberCard', () => {
  it('does not render without an array of numbers', () => {
    expect(() => render(<NumberCard />)).toThrow('Cannot read properties of undefined (reading \'map\')');
  });

  it('renders with content', () => {
    render(<NumberCard numbers={ numbers } />);

    expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();
    expect(screen.getByText('1')).toBeDefined(); // from numbers array
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText('4')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
  });
});
