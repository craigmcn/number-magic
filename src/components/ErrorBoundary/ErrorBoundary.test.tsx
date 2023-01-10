import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders with children', () => {
    render(<ErrorBoundary><div>Test error child</div></ErrorBoundary>);

    expect(screen.getByText('Test error child')).toBeDefined();
  });
});
