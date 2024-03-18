import React from 'react'
import { render } from '@testing-library/react'
import PortfolioCard from '.'
import '@testing-library/jest-dom/extend-expect'
import theme from '../../../theme'

describe('PortfolioCard', () => {
  const mockProps1 = {
    iconSrc: 'asset/icons/bitcoin.svg',
    currencyType: 'Bitcoin',
    currencyValue: '$ 0.00',
    currencyAcronym: 'BTC',
    isProfit: true,
    profitLoss: '- 0.0%',
  }

  it('should render the component with correct props', () => {
    const { getByText, getByAltText } = render(
      <PortfolioCard {...mockProps1} />
    )

    expect(getByAltText('BTC')).toBeInTheDocument()
    expect(getByText('Bitcoin')).toBeInTheDocument()
    expect(getByText('$ 0.00')).toBeInTheDocument()
    expect(getByText('- 0.0%')).toBeInTheDocument()
  })

  const mockProps2 = {
    iconSrc: 'asset/icons/bitcoin.svg',
    currencyType: 'Bitcoin',
    currencyValue: '$ 0.00',
    currencyAcronym: 'BTC',
    isProfit: false,
    profitLoss: '- 0.0%',
  }

  it('should render the profit loss component with correct color', () => {
    const { getByText, getByAltText } = render(
      <PortfolioCard {...mockProps2} />
    )
    const profitLossElement = getByText('- 0.0%')
    expect(profitLossElement).toHaveStyle(
      `color: ${theme.palette.semantic.error[500]}`
    )
  })
})
