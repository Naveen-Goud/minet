import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CurrencySelection from '.'
import '@testing-library/jest-dom/extend-expect'

const currencySelectionData = [
  { id: 1, label: 'Bitcoin', color: 'rgba(247, 147, 26, 0.20)' },
  { id: 2, label: 'XRP', color: 'rgba(34, 34, 34, 0.20)' },
  { id: 3, label: 'Polkadot', color: 'rgba(230, 0, 122, 0.20)' },
  { id: 4, label: 'Ethereum', color: 'rgba(98, 126, 234, 0.20)' },
  { id: 5, label: 'Tether', color: 'rgba(38, 161, 123, 0.20)' },
  { id: 6, label: 'Ethereum 2', color: 'rgba(25, 25, 113, 0.20)' },
  { id: 7, label: 'Dodge Coin', color: 'rgba(219, 201, 132, 0.20)' },
]

test('renders CurrencySelection without errors', () => {
  render(
    <CurrencySelection
      currencyList={currencySelectionData}
      getSelectedIdOnClick={() => {}}
    />
  )
})

test('renders correct number of CustomCurrencyChip components', () => {
  const { getAllByTestId } = render(
    <CurrencySelection
      currencyList={currencySelectionData}
      getSelectedIdOnClick={() => {}}
    />
  )

  const currencyChips = getAllByTestId('custom-currency-chip')
  expect(currencyChips).toHaveLength(currencySelectionData.length)
})

test('invokes getSelectedIdOnClick with correct currency ID', () => {
  const mockGetSelectedIdOnClick = jest.fn()

  const { getAllByTestId } = render(
    <CurrencySelection
      currencyList={currencySelectionData}
      getSelectedIdOnClick={mockGetSelectedIdOnClick}
    />
  )

  const currencyChips = getAllByTestId('custom-currency-chip')
  fireEvent.click(currencyChips[1])

  expect(mockGetSelectedIdOnClick).toHaveBeenCalledTimes(1)
  expect(mockGetSelectedIdOnClick).toHaveBeenCalledWith(
    currencySelectionData[1].id
  )
})
