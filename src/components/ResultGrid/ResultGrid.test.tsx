import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResultGrid from './ResultGrid';

const result = [[1], [2], [3]];

describe('ResultGrid', () => {
  it('does not render without result array', () => {
    render(<ResultGrid result={ [] } />);

    expect(screen.queryByText(/[/w]/)).toBeNull();
  });

  it('renders with content', () => {
    render(<ResultGrid result={ result } />);

    expect(screen.getByText('1')).toBeDefined(); // from result array
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
  });
});
