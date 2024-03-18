import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DashboardPage, { ViewMyPortfolio } from '.'
import axios from 'axios'
import { when } from 'jest-when'
import { BackendUrl, apiBase } from '../../utils/constants'
import {
  fetchPortfolioData,
  fetchWalletData,
  fetchWatchlistData,
  getInvestingHistory,
  getPriceHistory,
  mapPortfolioData,
  mapSelectData,
  mapWatchlistData,
} from './utils'
import {
  CoinsContext,
  DashboardLoader,
  UserContext,
  WatchlistContext,
} from '../../App'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent } from '@testing-library/react'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

const axiosSpy = jest.spyOn(axios, 'get')

const mockCoinData = {
  data: [
    {
      id: 1,
      acronym: 'BTC',
      name: 'Bitcoin',
      iconUrl: 'https://example.com/bitcoin.png',
      currentPrice: 43000,
      marketCap: 800000000000,
      circulatingSupply: 18000000,
      volume: 20000000000,
    },
  ],
}

const priceHistory = {
  data: [
    {
      id: 1,
      coinId: 1,
      priceHistory: [
        {
          date: '2023-07-09',
          price: 33065.98,
        },
        {
          date: '2023-07-08',
          price: 28769.08,
        },
        {
          date: '2023-07-07',
          price: 31721.11,
        },
        {
          date: '2023-07-06',
          price: 36967.98,
        },
        {
          date: '2023-07-05',
          price: 34065.66,
        },
        {
          date: '2023-07-04',
          price: 30065.01,
        },
        {
          date: '2023-07-03',
          price: 33000.98,
        },
      ],
    },
  ],
}

const mockWatchlistData = {
  data: [
    {
      id: 1,
      coinId: 1,
      userId: 123,
    },
  ],
}

const investments = {
  data: [
    {
      id: 1,
      userId: 1,
      currency: '$',
      investmentHistory: [
        {
          date: '2023-07-09',
          investedAmount: 15000,
        },
        {
          date: '2023-07-08',
          investedAmount: 15000,
        },
        {
          date: '2023-07-07',
          investedAmount: 7000,
        },
        {
          date: '2023-07-06',
          investedAmount: 7000,
        },
        {
          date: '2023-07-05',
          investedAmount: 0,
        },
        {
          date: '2023-07-04',
          investedAmount: 0,
        },
        {
          date: '2023-07-03',
          investedAmount: 0,
        },
      ],
    },
  ],
}

const portfolio = {
  data: [
    {
      id: 1,
      userId: 1,
      coinId: 1,
      balance: 0.23451,
      iconUrl: '../assets/icons/bitcoin.svg',
    },
  ],
}

const transactions = {
  data: [
    {
      id: 1,
      user_id: 1,
      action: 'purchase',
      coinId: 1,
      coinValue: 0.5,
      amount: 17032.52,
      time: 'Thu Jul 20 2023 11:13:41 GMT+0530 (India Standard Time)',
      status: 'pending',
      fromUser: 'Jane Smith',
      toUser: 'John Smith',
    },
  ],
}

const wallet = {
  data: [
    {
      id: 1,
      userId: 1,
      currencyId: 1,
      currencyName: 'US Dollar',
      acronym: 'USD Coin',
      symbol: '$',
      balance: 34000,
    },
  ],
}

const expectedConvertedData = [
  {
    id: 1,
    Name: {
      name: 'Bitcoin',
      currency: 'BTC',
      imageSrc: 'https://example.com/bitcoin.png',
    },
    Price: '$43000.00',
    MarketCap: '$1T',
    Change: '30.0',
    favorite: true,
  },
]

describe('utils functions test', () => {
  it('should fetch watchlist data correctly without any errors', async () => {
    when(axiosSpy)
      .calledWith(BackendUrl + 'coins')
      .mockResolvedValue(mockCoinData)
    when(axiosSpy)
      .calledWith(`${apiBase}/watchlists`, {
        params: {
          userId: 1,
        },
      })
      .mockResolvedValue(mockWatchlistData)
    when(axiosSpy)
      .calledWith(BackendUrl + 'price', {
        params: {
          coinId: 1,
        },
      })
      .mockResolvedValue(priceHistory)

    const setCoinsData = jest.fn()
    const setLoadDashboard = jest.fn()
    await fetchWatchlistData(1, setCoinsData, setLoadDashboard)

    const convertData = jest.fn()
    convertData.mockResolvedValue(expectedConvertedData)
  })

  it('should fetch price history of a given coin without any error', async () => {
    const dummyCoinId = 1
    when(axiosSpy)
      .calledWith(BackendUrl + 'price', {
        params: {
          coinId: dummyCoinId,
        },
      })
      .mockResolvedValue(priceHistory)

    await getPriceHistory(dummyCoinId)
  })

  it('should map watchlist data correctly without any error', async () => {
    const dummyCoinId = 1
    when(axiosSpy)
      .calledWith(BackendUrl + 'price', {
        params: {
          coinId: dummyCoinId,
        },
      })
      .mockResolvedValue(priceHistory)
    await mapWatchlistData(expectedConvertedData)
  })

  it('should fetch investment history without any error', async () => {
    const dummyUserId = 1
    when(axiosSpy)
      .calledWith(BackendUrl + 'investments', {
        params: {
          userId: dummyUserId,
        },
      })
      .mockResolvedValue(investments)
    await getInvestingHistory(dummyUserId)
  })
  it('should map portfolio data without any error', async () => {
    when(axiosSpy)
      .calledWith(BackendUrl + 'investments', {
        params: {
          userId: 1,
        },
      })
      .mockResolvedValue(investments)
    when(axiosSpy)
      .calledWith(BackendUrl + 'price', {
        params: {
          coinId: 1,
        },
      })
      .mockResolvedValue(priceHistory)
    await mapPortfolioData(expectedConvertedData, 1)
  })
  it('should map selected data without any error', async () => {
    await mapSelectData(expectedConvertedData)
  })

  it('should fetch portfolio data without any error', async () => {
    const dummyUserId = 1
    when(axiosSpy)
      .calledWith(BackendUrl + 'portfolio', {
        params: {
          userId: dummyUserId,
        },
      })
      .mockResolvedValue(portfolio)
    await fetchPortfolioData(dummyUserId, expectedConvertedData)
  })

  it('should fetch wallet data without any error', async () => {
    const dummyUserId = 1
    when(axiosSpy)
      .calledWith(BackendUrl + 'transactions', {
        params: {
          userId: dummyUserId,
        },
      })
      .mockResolvedValue(transactions)
    when(axiosSpy)
      .calledWith(BackendUrl + 'wallet', {
        params: {
          userId: dummyUserId,
        },
      })
      .mockResolvedValue(wallet)

    await fetchWalletData(dummyUserId, expectedConvertedData)
  })
})

describe('dashboard page tests', () => {
  it('should render without any error', () => {
    when(axiosSpy)
      .calledWith(BackendUrl + 'coins')
      .mockResolvedValue(mockCoinData)
    when(axiosSpy)
      .calledWith(`${apiBase}/watchlists`, {
        params: {
          userId: 1,
        },
      })
      .mockResolvedValue(mockWatchlistData)
    const fetchDashboardData = jest.fn()
    const fetchWatchlistData = jest.fn()
    fetchWatchlistData.mockResolvedValue([])
    fetchDashboardData.mockReturnValue([])
    const setWatchlistData = jest.fn()
    setWatchlistData.mockReturnValue([])
    const userId = 1
    const mockUserContextValue = { userId }
    const coinsData = []
    const mockUserCoinData = { coinsData }
    const dashboardLoader = true
    const mockDashboardLoader = { dashboardLoader }

    render(
      <BrowserRouter>
        <UserContext.Provider value={mockUserContextValue}>
          <CoinsContext.Provider value={mockUserCoinData}>
            <DashboardLoader.Provider value={mockDashboardLoader}>
              <WatchlistContext.Provider
                value={{
                  watchlistData: [],
                  setWatchlistData: setWatchlistData,
                }}
              >
                <DashboardPage />
              </WatchlistContext.Provider>
            </DashboardLoader.Provider>
          </CoinsContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )
    const discover = screen.getByTestId('discover-assets')
    expect(discover).toBeInTheDocument()
    fireEvent.click(discover)

    const watchlist = screen.getByTestId('watchlist-items')
    expect(watchlist).toBeInTheDocument()
    fireEvent.click(watchlist)
  })
})
