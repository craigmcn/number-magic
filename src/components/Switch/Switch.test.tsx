import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Switch from './Switch';

describe('Switch', () => {
  it('renders with content, label and checkbox accept click event', async () => {
    const user = userEvent.setup();
    const mockChange = vi.fn();
    render(<Switch onChange={ mockChange }>Test</Switch>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(mockChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();

    const label = screen.getByLabelText('Test');
    expect(label).toBeInTheDocument();

    await user.click(label);

    expect(mockChange).toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });

  it('renders with content, label and checkbox (checked) accept click event', async () => {
    const user = userEvent.setup();
    const mockChange = vi.fn();
    render(<Switch onChange={ mockChange } checked={ true }>Test</Switch>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(mockChange).toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();

    const label = screen.getByLabelText('Test');
    expect(label).toBeInTheDocument();

    await user.click(label);

    expect(mockChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });
});
