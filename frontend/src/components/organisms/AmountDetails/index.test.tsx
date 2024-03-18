import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AmountDetails } from '.'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'

describe('AmountDetails', () => {
  test('renders with correct values Sell-Transaction', () => {
    const props = {
      currencyValue: 1,
      cryptoValue: 34065,
      currency: 'BTC',
    }

    render(<AmountDetails action="sell" {...props} />)

    expect(screen.getByText('Amount Details')).toBeInTheDocument()

    expect(screen.getByText('Sell max')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Sell max'))

    expect(screen.getByText('USD coin (cash)')).toBeInTheDocument()

    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    act(() => {
      fireEvent.change(slider, { target: { value: '0.5' }, newValue: '1' })
    })
  })
  test('renders with correct values Purchase-Transaction', () => {
    const props = {
      amount: 340000,
      cryptoValue: 34065,
      currency: 'BTC',
    }

    render(<AmountDetails action="purchase" {...props} />)

    expect(screen.getByText('Amount Details')).toBeInTheDocument()

    expect(screen.getByText('Buy max')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Buy max'))

    expect(screen.getByText('BTC')).toBeInTheDocument()

    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    act(() => {
      fireEvent.change(slider, { target: { value: '1000' }, newValue: '10000' })
    })
  })
})
