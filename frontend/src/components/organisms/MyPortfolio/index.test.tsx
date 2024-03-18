import React from 'react'
import { render, screen } from '@testing-library/react'
import Portfolio from './'

describe('Portfolio', () => {
  const data = [
    {
      iconSrc: '',
      currencyType: 'Bitcoin',
      currencyValue: 5000,
      profitLoss: '+200',
      currencyAcronym: 'BTC',
      isProfit: true,
    },
    {
      iconSrc: '',
      currencyType: 'Ethereum',
      currencyValue: 3000,
      profitLoss: '-100',
      currencyAcronym: 'ETH',
      isProfit: false,
    },
  ]

  it('renders portfolio cards with correct data', () => {
    const { getByText, getByAltText } = render(<Portfolio data={data} />)
  })
})
