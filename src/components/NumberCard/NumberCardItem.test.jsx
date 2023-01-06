import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import NumberCardItem from './NumberCardItem';

describe('NumberCardItem', () => {
  it('renders without content', () => {
    render(<NumberCardItem />);
    expect(screen.queryByText(/[/w]/)).toBeNull();
  });

  it('renders with content', () => {
    render(<NumberCardItem number={ 1 } />);
    expect(screen.getByText('1')).toBeDefined();
  });
});
