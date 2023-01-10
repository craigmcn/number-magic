import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResultCard from './ResultCard';

const card = [1, 2, 3];

describe('ResultCard', () => {
  it('does not render without card array', () => {
    render(<ResultCard card={ [] } />);

    expect(screen.queryByText('63')).not.toBeInTheDocument();
  });

  it('renders with content', () => {
    render(<ResultCard card={ card } />);

    expect(screen.getByText('1')).toBeDefined(); // from card array
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
  });
});
