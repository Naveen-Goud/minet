import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React, { useState } from 'react'
import { AllAssets } from '.'
import { AllAssetRows } from '../../../utils/constants'
import { act } from 'react-dom/test-utils'
import {
  nameSortComparator,
  priceAndChangeSortComparator,
  marketCapSortComparator,
} from './utils'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

describe('AllAssets', () => {
  it('renders correctly', () => {
    const Test = () => {
      const [rows, setRows] = useState(AllAssetRows)
      return <AllAssets rows={rows} setAllAssetRows={setRows} />
    }
    const { container } = render(<Test />)

    const watchlist = screen.getByText('Watchlist')
    expect(watchlist).toBeInTheDocument()
    fireEvent.click(watchlist)
    const search = container.querySelector('#search') as HTMLInputElement
    expect(search).toBeInTheDocument()
    fireEvent.change(search, { target: { value: 'bit' } })
    fireEvent.change(search, { target: { value: '' } })

    const allAssets = screen.getAllByText('All Assets')
    expect(allAssets[0]).toBeInTheDocument()
    fireEvent.click(allAssets[0])
    const search1 = container.querySelector('#search') as HTMLInputElement
    expect(search1).toBeInTheDocument()
    act(() => {
      fireEvent.change(search1, { target: { value: 'et' } })
    })
    act(() => {
      fireEvent.change(search1, { target: { value: '' } })
    })
  })
  describe('Sort Comparators', () => {
    const testCases = [
      {
        name: 'Aardvark',
        price: '3.50 USD',
        change: '+0.25',
        marketCap: '5.2M',
      },
      {
        name: 'Zebra',
        price: '2.75 USD',
        change: '-0.10',
        marketCap: '10.8M',
      },
      {
        name: 'Giraffe',
        price: '4.20 USD',
        change: '+0.10',
        marketCap: '2.1M',
      },
    ]
    const sortAscending = (
      arr: any[],
      comparator: (a: any, b: any) => number
    ) => [...arr].sort(comparator)

    it('should correctly sort by Name', () => {
      const sortedByName = sortAscending(testCases, nameSortComparator)
      const expectedOrder = ['Aardvark', 'Giraffe', 'Zebra']
      expect(sortedByName.map((item) => item.name)).toEqual(expectedOrder)
    })

    it('should correctly sort by Price or change', () => {
      const sortedByPrice = sortAscending(testCases, (a, b) =>
        priceAndChangeSortComparator(a.price, b.price)
      )
      const expectedOrder = ['2.75 USD', '3.50 USD', '4.20 USD']
      expect(sortedByPrice.map((item) => item.price)).toEqual(expectedOrder)
    })

    it('should correctly sort by MarketCap', () => {
      const sortedByMarketCap = sortAscending(testCases, (a, b) =>
        marketCapSortComparator(a.marketCap, b.marketCap)
      )
      const expectedOrder = ['2.1M', '5.2M', '10.8M']
      expect(sortedByMarketCap.map((item) => item.marketCap)).toEqual(
        expectedOrder
      )
    })
  })
})
