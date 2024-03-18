import React from 'react';
import { fireEvent, render, screen} from '@testing-library/react';
import ChooseCrypto from '.';
import '@testing-library/jest-dom'
import theme from "../../../theme"
describe('ChooseCrypto', () => {
  const items = [
    { id: 1, iconUrl: 'bitcoin.png', name: 'Bitcoin', price: '$10,000' },
    { id: 2, iconUrl: 'ethereum.png', name: 'Ethereum', price: '$2,000' },
  ];

  it('renders ChooseCrypto component', () => {
    render(<ChooseCrypto items={items} />);
  });

  it('applies selected item styles on click', () => {
    render(<ChooseCrypto items={items} />);
    const element = screen.getByTestId(1);
    fireEvent.click(element);
    expect(element).toHaveStyle(`border: 2px solid ${theme.palette.primary[500]}`);
  });
});
