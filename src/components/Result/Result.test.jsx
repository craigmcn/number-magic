import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import hooks from 'usehooks-ts';
import Result from './Result';

const result = [[1], [2], [3]];

describe('Result', () => {
  it('does not render without a result array', () => {
    expect(() => render(<Result />)).toThrow('Cannot read properties of undefined (reading \'reduce\')');
  });

  it('renders with no cards selected', () => {
    render(<Result result={ [] } />);

    expect(screen.getByRole('heading', { name: 'Your number is' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '64' })).toBeInTheDocument(); // default
    expect(screen.getByRole('button', { name: 'Play again' })).toBeInTheDocument();
  });

  it('renders with content', () => {
    render(<Result result={ result } />);

    expect(screen.getByRole('heading', { name: 'Your number is' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '6' })).toBeInTheDocument(); // total of `result`
    expect(screen.getByRole('button', { name: 'Play again' })).toBeInTheDocument();
  });

  it('renders with manual content', () => {
    vi.spyOn(hooks, 'useReadLocalStorage').mockImplementation(() => true);
    render(<Result result={ result } />);

    expect(screen.queryByRole('heading', { name: 'Your number is' })).toBeNull();
    expect(screen.queryByRole('heading', { name: '6' })).toBeNull();
    expect(screen.getByText('1')).toBeDefined(); // from result array
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Play again' })).toBeInTheDocument();
  });

  it('renders with non-manual content', () => {
    vi.spyOn(hooks, 'useReadLocalStorage').mockImplementation(() => false);
    render(<Result result={ result } />);

    expect(screen.getByRole('heading', { name: 'Your number is' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '6' })).toBeInTheDocument(); // total of `result`
    expect(screen.getByRole('button', { name: 'Play again' })).toBeInTheDocument();
  });
});
