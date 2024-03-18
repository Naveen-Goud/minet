import React from 'react';
import { render, screen } from '@testing-library/react';
import DeliveryFee from '.';

describe('DeliveryFee component', () => {
  it('renders the "Select speed delivery" text correctly', () => {
    render(<DeliveryFee />);
    const selectSpeedDeliveryText = screen.getByText('Select speed delivery');
    expect(selectSpeedDeliveryText).toBeInTheDocument
  });

  it('renders the DeliveryDropDown component', () => {
    render(<DeliveryFee />);
    const deliveryDropDown = screen.getByTestId('delivery-dropDown');
    expect(deliveryDropDown).toBeInTheDocument
  });
});
