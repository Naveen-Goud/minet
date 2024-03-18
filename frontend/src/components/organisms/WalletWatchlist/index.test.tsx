import React from 'react';
import { render, screen } from '@testing-library/react';
import WalletWatchlist from '.';
import theme from "../../../theme"

import '@testing-library/jest-dom'

describe('WalletWatchlist', () => {
  const props = {
    imageSrc: 'test-image.jpg',
    name: 'Bitcoin',
    currency: 'BTC',
    number: 10,
    marketCap: '$1,000,000',
    volume: '$100,000',
    circulatingSupply: '1,000,000',
  };
  const propsNegative= {
    imageSrc: 'test-image.jpg',
    name: 'Bitcoin',
    currency: 'BTC',
    number: -10,
    marketCap: '$1,000,000',
    volume: '$100,000',
    circulatingSupply: '1,000,000',
  };
  it('renders the component correctly', () => {
    const { container } = render(<WalletWatchlist {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct cryptocurrency name', () => {
    render(<WalletWatchlist {...props} />);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  });
  it('displays the correct currency', () => {
    const { getByText } = render(<WalletWatchlist {...props} />);
    expect(getByText('BTC')).toBeInTheDocument();
  });
  it('applies success color for positive numbers', () => {
    render(<WalletWatchlist {...props} />);
      const changeText = screen.getByText('10%');
      expect(changeText).toBeInTheDocument();
      expect(changeText).toHaveStyle(`color: ${theme.palette.semantic.success[500]}`);

  });
  it('applies error color for negative numbers', () => {
    render(<WalletWatchlist {...propsNegative} />);
      const changeText = screen.getByText('-10%');
      expect(changeText).toBeInTheDocument();
      expect(changeText).toHaveStyle(`color: ${theme.palette.semantic.error[500]}`);

  });
  it('displays the correct arrow image based on the number prop', () => {
    const { getByAltText } = render(<WalletWatchlist {...props} />);
    const arrowImage = getByAltText('Arrow');
    expect(arrowImage).toHaveAttribute('src', '../assets/icons/greenarrow.svg');
  });

  it('displays the correct percentage value', () => {
    const { getByText } = render(<WalletWatchlist {...props} />);
    expect(getByText('10%')).toBeInTheDocument();
  });

});
