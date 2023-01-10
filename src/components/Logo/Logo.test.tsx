import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import Logo from './Logo';

describe('Logo', () => {
  it('renders', () => {
    render(<Logo />);
  });
});
