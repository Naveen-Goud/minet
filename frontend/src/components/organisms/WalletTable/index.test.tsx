import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import WalletTable, { WalletTableProps } from '.'
import '@testing-library/jest-dom/extend-expect'

describe('WalletTable', () => {
  const mockData: WalletTableProps['data'] = [
    {
      id: 1,
      date: new Date(),
      status: 'Transaction 1',
      currencyName: 'USD',
      from: 'John Doe',
      currencyValue: '100',
      convertedAmount: '500',
      transactionState: 'completed',
    },
    {
      id: 2,
      date: new Date(),
      status: 'Transaction 2',
      currencyName: 'EUR',
      from: 'Jane Smith',
      currencyValue: '200',
      convertedAmount: '1000',
      transactionState: 'pending',
    },
  ]

  test('renders the table with correct data', () => {
    render(<WalletTable data={mockData} />)

    const transactionCards = screen.getAllByTestId('transaction-card')
    expect(transactionCards.length).toBe(mockData.length)

    mockData.forEach((item, index) => {
      const transactionCard = transactionCards[index]

      expect(transactionCard).toHaveTextContent(item.status)
      expect(transactionCard).toHaveTextContent(item.currencyName)
      expect(transactionCard).toHaveTextContent(item.from)
    })
  })

  test('searches and filters the table data correctly', () => {
    render(<WalletTable data={mockData} />)

    const searchInput = screen.getByPlaceholderText('Search all assets')
    const searchQuery = 'Jane Smith'
    fireEvent.change(searchInput, { target: { value: searchQuery } })

    const transactionCards = screen.getAllByTestId('transaction-card')
    expect(transactionCards.length).toBe(1)
    expect(transactionCards[0]).toHaveTextContent(searchQuery)
  })
})
