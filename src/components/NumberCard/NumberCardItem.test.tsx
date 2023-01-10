import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NumberCardItem from './NumberCardItem';

describe('NumberCardItem', () => {
  it('renders with content', () => {
    render(<NumberCardItem number={ 1 } />);
    expect(screen.getByText('1')).toBeDefined();
  });
});
