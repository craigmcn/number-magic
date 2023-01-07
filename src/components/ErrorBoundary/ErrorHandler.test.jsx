import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ErrorHandler from './ErrorHandler';

const error = { message: 'Test error message' };

describe('ErrorHandler', () => {
  it('renders', () => {
    render(<ErrorHandler />);
  });

  it('renders with content', () => {
    render(<ErrorHandler error={ error } />);

    expect(screen.getByRole('alert')).toBeDefined();
    expect(screen.getByText('An error occurred')).toBeDefined();
    expect(screen.getByText(error.message)).toBeDefined(); // from error object
  });
});
