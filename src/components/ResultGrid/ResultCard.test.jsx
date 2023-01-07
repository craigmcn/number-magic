import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ResultCard from './ResultCard';

const card = [1, 2, 3];

describe('ResultCard', () => {
  it('does not render without card array', () => {
    expect(() => render(<ResultCard />)).toThrow('Cannot read properties of undefined (reading \'map\')');
  });

  it('renders with content', () => {
    render(<ResultCard card={ card } />);

    expect(screen.getByText('1')).toBeDefined(); // from card array
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
  });
});
