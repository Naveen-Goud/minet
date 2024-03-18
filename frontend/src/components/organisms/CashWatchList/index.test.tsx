import React from 'react';
import { render, screen } from '@testing-library/react';
import CashWatchlist from '.';
import '@testing-library/jest-dom'

describe('CashWatchlist', () => {
  test('renders the heading and cash text correctly', () => {
    render(<CashWatchlist />);
    const headingElement = screen.getByText('USD Coin');
    const cashElement = screen.getByText('Cash');

    expect(headingElement).toBeInTheDocument();
    expect(cashElement).toBeInTheDocument();
  });

  test('renders the two buttons correctly', () => {
    render(<CashWatchlist />);
    const button1 = screen.getByText('CASH DEPOSIT');
    const button2 = screen.getByText('WITHDRAWAL');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
});
