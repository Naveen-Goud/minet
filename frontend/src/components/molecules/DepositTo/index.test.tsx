import { render, screen } from '@testing-library/react';
import DepositTo from '.';
import React from 'react';
describe('DepositTo component', () => {
  const mockProps = {
    iconSrc: 'path/to/icon',
    iconTitle: 'Icon Title',
    remainingBalance: '1000',
  };

  it('renders the payment method title correctly', () => {
    render(<DepositTo type={'Payment Method'} {...mockProps} />);
    const paymentMethodTitle = screen.getByText('Payment Method');
    expect(paymentMethodTitle).toBeInTheDocument
  });

  it('renders the icon and currency details correctly', () => {
    render(<DepositTo type={''} {...mockProps} />);
    const currencyTitle = screen.getByText('Icon Title');

    expect(currencyTitle).toBeInTheDocument

  });

  it('renders the default currency method correctly', () => {
    render(<DepositTo type={''} {...mockProps} />);
    const defaultCurrencyMethod = screen.getByText('Default');
    expect(defaultCurrencyMethod).toBeInTheDocument
  });
});
