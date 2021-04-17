import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminUserDocs from '../pages/AdminUserDocs/AdminUserDocs';

test('renders app name', () => {
  render(<AdminUserDocs />);
  const title = screen.getByText(/Know your customer on the news/i);
  expect(title).toBeInTheDocument();
});