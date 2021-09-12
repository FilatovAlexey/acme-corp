import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: '1',
        firstName: 'Xin',
        lastName: 'Stafford',
        email: 'DCardenas@aliquam.gov',
        phone: '(691)073-9401',
        address: {
          streetAddress: '6287 Eros Rd',
          city: 'San Gabriel Valley',
          state: 'AR',
          zip: '70858',
        },
        description:
          'sed at nec libero nec quis aliquam amet id odio libero ipsum suspendisse rutrum etiam sit donec eget ac pretium lacus orci turpis convallis sapien scelerisque molestie dolor pulvinar sed lacus sollicitudin',
      }),
  });
});

describe('App', () => {
  it('Loads th users on mount', async () => {
    await act(async () => render(<App />));
    expect(screen.getByText('Stafford')).toBeInTheDocument();
  });
});
