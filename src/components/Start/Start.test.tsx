import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Start from './Start';

describe('Start', () => {
  it('renders app Start', () => {
    render(<Start handleStart={ vi.fn() } />);

    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();
  });
});
