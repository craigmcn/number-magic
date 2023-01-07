import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import Logo from './Logo';

describe('Logo', () => {
  it('renders', () => {
    render(<Logo />);
  });
});
