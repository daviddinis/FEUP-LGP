import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from 'pages/HomePage/HomePage';
import {BrowserRouter as Router} from "react-router-dom";

test('renders app name', () => {
  render(<Router><Home /></Router>);
  const title = screen.getByText(/Know your customer on the news/i);
  expect(title).toBeInTheDocument();
});