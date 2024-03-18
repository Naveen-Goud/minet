
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardHeader from '.';
import '@testing-library/jest-dom'

describe('DashboardHeader', () => {
  const mockSellClick = jest.fn();
  const mockBuyClick = jest.fn();
  test('renders correctly', () => {
    render(<DashboardHeader  headerContent="Dashboard"
    sellEnabled={false}
    buyEnabled={false}
    />);

    const dashboardText = screen.getByText('Dashboard');
    expect(dashboardText).toBeInTheDocument();

    const sellButton = screen.getByText('SELL');
    expect(sellButton).toBeInTheDocument();

    const buyButton = screen.getByText('BUY');
    expect(buyButton).toBeInTheDocument();

    const avatarImage = screen.getByAltText('avatar with icon');
    expect(avatarImage).toBeInTheDocument();
  });
  test('handles sell when sellEnabled prop is true', () => {
    render(
      <DashboardHeader
        headerContent="Dashboard Header"
        sellEnabled={true}
        handleSellClick={mockSellClick}
        buyEnabled={false}
        handleBuyClick={mockBuyClick}
      />
    );

    const sellButton = screen.getByText('SELL');
    fireEvent.click(sellButton);
    expect(mockSellClick).toHaveBeenCalled();

  });

  test('handles buy when buyEnabled prop is true', () => {
    render(
      <DashboardHeader
        headerContent="Dashboard Header"
        sellEnabled={false}
        handleSellClick={mockSellClick}
        buyEnabled={true}
        handleBuyClick={mockBuyClick}
      />
    );

    const buyButton = screen.getByText('BUY');
    fireEvent.click(buyButton);
    expect(mockBuyClick).toHaveBeenCalled();
  });

  test('when buyEnabled prop is false', () => {
    render(
      <DashboardHeader
        headerContent="Dashboard Header"
        sellEnabled={true}
        handleSellClick={mockSellClick}
        buyEnabled={false}
        handleBuyClick={mockBuyClick}
      />
    );

    const sellButton = screen.getByText('SELL');
    fireEvent.click(sellButton);
    expect(mockSellClick).toHaveBeenCalled();
    const buyButton = screen.getByText('BUY');
    fireEvent.click(buyButton);
    expect(mockBuyClick).not.toHaveBeenCalled();
  });
  
  test('handles sell when sellEnabled prop is false', () => {
    render(
      <DashboardHeader
        headerContent="Dashboard Header"
        sellEnabled={false}
        handleSellClick={mockSellClick}
        buyEnabled={false}
        handleBuyClick={mockBuyClick}
      />
    );
    const sellButton = screen.getByText('SELL');
    fireEvent.click(sellButton);
    expect(mockSellClick).not.toHaveBeenCalled();
  });

  test('should hide sell button and buy button', () => {
    render(
      <DashboardHeader
        headerContent="Dashboard Header"
        sellHidden
        buyHidden sellEnabled={false} buyEnabled={false} />
    );
    const sellButton = screen.getByText('SELL');
    const buyButton = screen.getByText('BUY');
    expect(sellButton).not.toBeInTheDocument
    expect(buyButton).not.toBeInTheDocument

  });
});
