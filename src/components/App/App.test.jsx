import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders initial App', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();
  });

  it('starts correctly', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();

    const startButton = screen.queryByRole('button', { name: 'Got it!' });
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);

    expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();
    expect(screen.getByText('63')).toBeDefined(); // 63 is on every card
    expect(screen.getByRole('button', { name: 'Yes!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
  });

  it.each(
    [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61]
  )('loops to the result (%i) and starts again', async (magic) => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();

    const startButton = screen.queryByRole('button', { name: 'Got it!' });
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);

    expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();

    const yesButton = screen.queryByRole('button', { name: 'Yes!' });
    const noButton = screen.queryByRole('button', { name: 'No' });
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();

    let magicCard = screen.queryByText(magic);

    for (let i = 0; i < 6; i += 1) {
      if (magicCard) {
        fireEvent.click(yesButton);
      } else {
        fireEvent.click(noButton);
      }

      if (i < 5) {
        await waitFor(() => expect(yesButton).not.toBeDisabled());

        expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();
        magicCard = screen.queryByText(magic);
      } else {
        await waitFor(() => expect(yesButton).not.toBeInTheDocument());
      }
    }

    expect(screen.getByRole('heading', { name: 'Your number is' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: magic })).toBeInTheDocument(); // total of `result`

    const againButton = screen.queryByRole('button', { name: 'Play again' });
    expect(againButton).toBeInTheDocument();

    fireEvent.click(againButton);

    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();
  });
});
