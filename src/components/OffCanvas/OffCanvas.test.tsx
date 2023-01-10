import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import OffCanvas from './OffCanvas';

describe('OffCanvas', () => {
  it('renders', () => {
    render(<OffCanvas open={ false } close={ vi.fn() } />);

    expect(screen.getByRole('heading', { name: 'Number Magic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'craigmcn' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Magic' })).toBeInTheDocument();
  });
});
