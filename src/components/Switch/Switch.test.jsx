import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Switch from './Switch';

describe('Switch', () => {
  it('renders default component', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with content', () => {
    render(<Switch>Test</Switch>);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeDefined();
  });

  it('renders with content, label and checkbox accept click event', () => {
    const mockChange = vi.fn();
    render(<Switch onChange={ mockChange }>Test</Switch>);

    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(mockChange).toHaveBeenCalled();
    expect(checkbox.checked).toBe(true);

    const label = screen.queryByLabelText('Test');
    expect(label).toBeInTheDocument();

    fireEvent.click(label);

    expect(mockChange).toHaveBeenCalled();
    expect(checkbox.checked).toBe(false);
  });
});
