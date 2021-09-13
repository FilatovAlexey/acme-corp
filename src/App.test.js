import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => {
      Promise.resolve({
        lastname: 'Stafford',
      });
    },
  });
});

describe('App', () => {
  it('Loads th users on mount', async () => {
    await act(async () => render(<App />));
    expect(screen.getByText('Stafford')).toBeInTheDocument();
  });
});
