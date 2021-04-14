import React from 'react';
import { render, screen } from '@testing-library/react';
import UserFeed from '../pages/UserFeed/UserFeed';

test('renders app name', () => {
  render(<UserFeed />);
  const title = screen.getByText(/Know your customer on the news/i);
  expect(title).toBeInTheDocument();
});