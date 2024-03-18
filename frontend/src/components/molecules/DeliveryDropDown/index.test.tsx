import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomDropdown from '.'
import '@testing-library/jest-dom'
jest.mock('../../../utils/constants', () => ({
  DeliveryDetails: [
    {
      name: 'Instant',
      time: '2-5 minutes',
      deliveryFee: '0.001 BTC',
    },
    {
      name: 'Faster',
      time: '4 hours',
      deliveryFee: '0.0001 BTC',
    },
    {
      name: 'Fast',
      time: '120 hours',
      deliveryFee: '0.00001 BTC',
    },
  ],
  DeliveryDetailsPlaceholder: {
    name: 'Instant : 2-5 min',
    fees: 'Transaction fees: 0.001 BTC',
  },
  none: 'None',
}))
import {
  DeliveryDetails,
  DeliveryDetailsPlaceholder,
  none,
} from '../../../utils/constants'

describe('CustomDropdown', () => {
  test('renders the dropdown component with correct delivery options', () => {
    render(<CustomDropdown width="100%" />)

    const placeholderNameElements = screen.getAllByText(
      new RegExp(DeliveryDetailsPlaceholder.name)
    )
    expect(placeholderNameElements).toHaveLength(1)

    const placeholderFeesElements = screen.getAllByText(
      new RegExp(DeliveryDetailsPlaceholder.fees)
    )
    expect(placeholderFeesElements).toHaveLength(1)

    DeliveryDetails.forEach((item) => {
      const nameElements = screen.getAllByText(new RegExp(item.name))
      nameElements.forEach((element) => {
        expect(element).toHaveTextContent(new RegExp(item.name))
      })

      const timeElements = screen.getAllByText(new RegExp(item.time))
      timeElements.forEach((element) => {
        expect(element).toHaveTextContent(new RegExp(item.time))
      })
      const feeElements = screen.getAllByText(new RegExp(item.deliveryFee))
      feeElements.forEach((element) => {
        expect(element).toHaveTextContent(new RegExp(item.deliveryFee))
      })
    })

    const noneElements = screen.getAllByText(new RegExp(none))
    expect(noneElements).toHaveLength(1)
  })
})
