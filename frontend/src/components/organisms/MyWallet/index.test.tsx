import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MyWallet from './'

describe('MyWallet', () => {
  const mockProps = {
    iconSrc: 'path/to/icon',
    iconTilte: 'Wallet Icon',
    iconAcronym: 'WI',
    totalBalance: 1000,
    data: [
      {
        month: 'January',
        day: 1,
        status: 'Pending',
        currencyName: 'Bitcoin',
        from: 'John Doe',
        currencyValue: '0.01 BTC',
        convertedAmount: '$100',
        imgSource: 'path/to/image',
      },
    ],
  }

  it('renders the wallet title', () => {
    render(<MyWallet {...mockProps} />)
    const walletTitle = screen.getByText('My Wallet')
    expect(walletTitle).toBeInTheDocument
  })

  it('renders the total balance', () => {
    render(<MyWallet {...mockProps} />)
    const totalBalance = screen.getByText('$ 1,000')
    expect(totalBalance).toBeInTheDocument
  })

  it('renders the view all button', () => {
    render(<MyWallet {...mockProps} />)
    const viewAllButton = screen.getByText('view all')
    expect(viewAllButton).toBeInTheDocument
  })

  it('renders transaction data when view all is clicked', () => {
    render(<MyWallet {...mockProps} />)
    const viewAllButton = screen.getByText('view all')
    fireEvent.click(viewAllButton)

    const transactionTitle = screen.getByText('Bitcoin')
    const transactionAmount = screen.getByText('0.01 BTC')
    expect(transactionTitle).toBeInTheDocument
    expect(transactionAmount).toBeInTheDocument
  })

  it('renders empty transaction message when there is no data', () => {
    render(<MyWallet totalBalance={0} />)
    const emptyMessage = screen.getByText(
      "you don't own any crypto.Send yourself some crypto to get started."
    )
    expect(emptyMessage).toBeInTheDocument
  })
})
