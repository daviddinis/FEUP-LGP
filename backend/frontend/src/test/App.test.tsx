import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminUserDocs from '../pages/AdminUserDocs/AdminUserDocs';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

test('renders app name', () => {
  render(<Router><AdminUserDocs /></Router>);
  const title = screen.getByText(/Know your customer on the news/i);
  expect(title).toBeInTheDocument();
});