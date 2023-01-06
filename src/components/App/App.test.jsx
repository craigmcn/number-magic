import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders initial App', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();
  });
});
