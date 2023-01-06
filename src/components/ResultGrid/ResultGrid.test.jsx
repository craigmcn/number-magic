import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ResultGrid from './ResultGrid';

const result = [[1], [2], [3]];

describe('ResultGrid', () => {
  it('does not render without result array', () => {
    expect(() => render(<ResultGrid />)).toThrow('Cannot read properties of undefined (reading \'map\')');
  });

  it('renders with content', () => {
    render(<ResultGrid result={ result } />);

    expect(screen.getByText('1')).toBeDefined(); // from result array
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
  });
});
