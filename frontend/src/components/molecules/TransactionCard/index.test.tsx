import { render, screen } from '@testing-library/react'
import { TransactionCard } from '.'
import React from 'react'
import '@testing-library/jest-dom'

describe('TransactionCard', () => {
  const props = {
    month: 'July',
    day: 4,
    status: 'Completed',
    currencyName: 'Bitcoin',
    from: 'John Doe',
    currencyValue: '+ 0.5',
    convertedAmount: '+$1000',
    imgSource: 'transaction.png',
  }

  it('renders the transaction card correctly', () => {
    render(<TransactionCard {...props} />)

    expect(screen.getByText('July')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByAltText('Transaction status Image')).toBeInTheDocument()
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('from John Doe')).toBeInTheDocument()
    expect(screen.getByTestId('chip')).toBeInTheDocument()
    expect(screen.getByText('+ 0.5')).toBeInTheDocument()
    expect(screen.getByText('+$1000')).toBeInTheDocument()
  })
})
