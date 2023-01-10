import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NumberCard from './NumberCard';

const numbers = [1, 2, 3, 4, 5];

describe('NumberCard', () => {
  it('does not render without an array of numbers', () => {
    render(<NumberCard loading={ false } numbers={ [] } />);

    expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();
    expect(screen.queryByText('63')).not.toBeInTheDocument();
  });

  it('renders with content', () => {
    render(<NumberCard loading={ false } numbers={ numbers } />);

    expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();
    expect(screen.getByText('1')).toBeDefined(); // from numbers array
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText('4')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
  });
});
