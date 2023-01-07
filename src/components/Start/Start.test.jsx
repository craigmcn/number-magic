import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Start from './Start';

describe('Start', () => {
  it('renders app Start', () => {
    render(<Start />);

    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();
  });
});
