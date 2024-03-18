import axios from 'axios'
import {
  convertData,
  deleteFromWatchlist,
  getWatchlist,
  getPriceData,
} from './utils'
import { apiBase } from '../../utils/constants'
import { when } from 'jest-when'
import { render, screen, waitFor } from '@testing-library/react'
import TradePage from '.'
import { UserContext } from '../../App'
import '@testing-library/jest-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')
jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

const mockInputData = [
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
]

const mockUserId = 123

const mockWatchlistData = [
  {
    id: 1,
    coinId: 1,
    userId: 123,
  },
]

const mockPriceData = {
  priceHistory: [
    {
      date: '2023-07-21',
      price: 45000,
    },
    {
      date: '2023-07-20',
      price: 42000,
    },
  ],
}

describe('Utility Function Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should convert input data to output data with correct format', async () => {
    const spyAxios = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: mockWatchlistData })

    when(spyAxios)
      .calledWith(`${apiBase}/watchlists`, {
        params: {
          userId: mockUserId,
        },
      })
      .mockResolvedValueOnce(mockWatchlistData)

    when(spyAxios)
      .calledWith(`${apiBase}/price`, {
        params: {
          coinId: 1,
        },
      })
      .mockResolvedValueOnce({
        data: [{ priceHistory: mockPriceData.priceHistory }],
      })

    const outputData = await convertData(mockInputData, mockUserId)

    const expectedOutputData = [
      {
        id: 1,
        Name: {
          name: 'Bitcoin',
          currency: 'BTC',
          imageSrc: 'https://example.com/bitcoin.png',
        },
        Price: '$43,000',
        MarketCap: '$1T',
        Change: '30.0',
        favorite: true,
        volume: 20000000000,
      },
    ]

    expect(outputData).toEqual(expectedOutputData)
  })

  it('should call axios.delete with the correct URL when deleteFromWatchlist is invoked', () => {
    const mockWatchlistId = 1

    deleteFromWatchlist(mockWatchlistId)

    expect(axios.delete).toHaveBeenCalledWith(
      `${apiBase}/watchlists/${mockWatchlistId}`
    )
  })

  it('should call axios.get with the correct URL and userId parameter when getWatchlist  is invoked', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockWatchlistData })

    const response = await getWatchlist(mockUserId)

    expect(axios.get).toHaveBeenCalledWith(`${apiBase}/watchlists`, {
      params: {
        userId: mockUserId,
      },
    })

    expect(response).toEqual(mockWatchlistData)
  })

  it('should call axios.get with the correct URL and coinId parameter when getPriceData is invoked', async () => {
    const mockCoinId = 1

    const spyAxios = jest.spyOn(axios, 'get')
    when(spyAxios)
      .calledWith(`${apiBase}/price`, {
        params: {
          coinId: mockCoinId,
        },
      })
      .mockResolvedValue(mockPriceData.priceHistory)

    const response = await getPriceData(mockCoinId)
    console.log(response)

    expect(axios.get).toHaveBeenCalledWith(`${apiBase}/price`, {
      params: {
        coinId: mockCoinId,
      },
    })
  })
  it('should log error to console when it occurs', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')
    await getWatchlist(1)

    const spyAxios = jest.spyOn(axios, 'get')
    when(spyAxios)
      .calledWith(`${apiBase}/watchlists`, {
        params: {
          userId: 1,
        },
      })
      .mockRejectedValue(new Error('error'))

    await waitFor(() => {
      expect(consoleErrorSpy).toBeCalledTimes(1)
    })
  })
})
describe('TradePage', () => {
  test('should render TradePage component', async () => {
    const axiosSpy = jest.spyOn(axios, 'get')
    when(axiosSpy).calledWith(`${apiBase}/coins`).mockResolvedValue({
      data: mockInputData,
    })
    when(axiosSpy)
      .calledWith(`${apiBase}/watchlists`, {
        params: {
          userId: 1,
        },
      })
      .mockResolvedValue({ data: [{ userId: 1, coinId: 1, id: 1 }] })

    when(axiosSpy)
      .calledWith(`${apiBase}/price`, {
        params: {
          coinId: 1,
        },
      })
      .mockResolvedValue({
        data: [{ priceHistory: mockPriceData.priceHistory }],
      })

    const userId = 1
    const mockUserContextValue = { userId }

    const { getByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={mockUserContextValue}>
          <TradePage />
        </UserContext.Provider>
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(getByText('Trade')).toBeInTheDocument()
    })
  })
})
