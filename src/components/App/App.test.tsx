import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from './App';

const testMagic = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61];

describe('App', () => {
  it('renders initial App', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();
  });

  it('starts correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();

    const startButton = screen.getByRole('button', { name: 'Got it!' });
    expect(startButton).toBeInTheDocument();

    await user.click(startButton);

    expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();
    expect(screen.getByText('63')).toBeDefined(); // 63 is on every card
    expect(screen.getByRole('button', { name: 'Yes!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
  });

  it('loops to the result and starts again', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();

    const startButton = screen.getByRole('button', { name: 'Got it!' });
    expect(startButton).toBeInTheDocument();

    await user.click(startButton);

    expect(screen.getByRole('heading', { name: 'Is it any of these numbers?' })).toBeInTheDocument();

    const yesButton = screen.getByRole('button', { name: 'Yes!' });
    const noButton = screen.getByRole('button', { name: 'No' });
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();

    const magic = testMagic[Math.floor(Math.random() * testMagic.length)];
    let magicCard = screen.queryByText(magic);

    for (let i = 0; i < 6; i += 1) {
      if (magicCard) {
        await user.click(yesButton);
      } else {
        await user.click(noButton);
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
    expect(screen.getByRole('heading', { name: magic.toString() })).toBeInTheDocument(); // total of `result`

    const againButton = screen.getByRole('button', { name: 'Play again' });
    expect(againButton).toBeInTheDocument();

    await user.click(againButton);

    expect(screen.getByRole('heading', { name: 'Think of a number between 1 and 64' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();
  });
});
