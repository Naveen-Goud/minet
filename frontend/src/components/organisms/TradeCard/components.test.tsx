import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChangeComponent, NameComponent, WatchComponent }from './components';
import '@testing-library/jest-dom'
import theme from "../../../theme"
jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

describe('NameComponent', () => {
  it('renders the component correctly', () => {
    const name = 'John Doe';
    const currency = 'USD';
    const imageSrc = 'example.jpg';

    render(
      <NameComponent name={name} currency={currency} imageSrc={imageSrc} />
    );

    const nameText = screen.getByText(name);
    const currencyText = screen.getByText(currency);
    const image = screen.getByRole('img');

    expect(nameText).toBeInTheDocument();
    expect(currencyText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageSrc);
  });


});
describe('ChangeComponent', () => {
  it('renders the component correctly', () => {
    render(<ChangeComponent number={10} />);
    const changeText = screen.getByText('10%');
    expect(changeText).toBeInTheDocument();
  });

  it('applies success color for positive numbers', () => {
    render(<ChangeComponent number={10} />);
      const changeText = screen.getByText('10%');
      expect(changeText).toBeInTheDocument();
      expect(changeText).toHaveStyle(`color: ${theme.palette.semantic.success[500]}`);

  });
  it('applies error color for negative numbers', () => {
    render(<ChangeComponent number={-10} />);
      const changeText = screen.getByText('-10%');
      expect(changeText).toHaveStyle(`color: ${theme.palette.semantic.error[500]}`);
  });
});

describe('WatchComponent', () => {
  it('renders with initial state', () => {
    render(<WatchComponent row={{}} id={0} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '../assets/icons/star.svg');
  });

  it('toggles watched state on click', () => {
    render(<WatchComponent row={{}} id={0} />);
    const image = screen.getByRole('img');
    fireEvent.click(image);
  });
});
