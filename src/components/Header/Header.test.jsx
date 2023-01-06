import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Number Magic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'craigmcn' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Magic' })).toBeInTheDocument();
  });
});
