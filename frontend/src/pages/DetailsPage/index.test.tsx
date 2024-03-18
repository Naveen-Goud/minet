import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DetailsPage from '.'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { when } from 'jest-when'
import { BackendUrl } from '../../utils/constants'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))
jest.mock('axios')
const axiosSpy = jest.spyOn(axios, 'get')

describe('testing details page ', () => {
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
  const mockCoinData = [
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

  test('should render header component', () => {
    jest.mock('react-router-dom')

    const useLocation = jest.fn()

    useLocation.mockReturnValue({
      search: '?coinId=1',
    })

    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(1)
    const walletData = {
      data: [],
    }
    when(axiosSpy)
      .calledWith(BackendUrl + 'price', {
        params: {
          coinId: 1,
        },
      })
      .mockResolvedValue(priceHistory)

    when(axiosSpy)
      .calledWith(BackendUrl + 'coins/' + '1')
      .mockResolvedValue({ data: mockCoinData[0] })

    when(axiosSpy)
      .calledWith(BackendUrl + 'portfolio', {
        params: {
          userId: 1,
          coinId: 1,
        },
      })
      .mockResolvedValue({ data: [{}] })

    when(axiosSpy)
      .calledWith(BackendUrl + 'transactions', {
        params: {
          user_id: 1,
          coinId: 1,
        },
      })
      .mockResolvedValue({ data: [{}] })

    const transactionsData = {
      data: [
        {
          id: 1,
          action: 'buy',
          status: 'completed',
          fromUser: 'user1',
          time: 'Thu Jul 20 2023 11:13:41 GMT+0530',
          amount: 50,
          coinValue: 0.005,
        },
        {
          id: 2,
          action: 'sell',
          status: 'pending',
          fromUser: 'user2',
          time: 'Thu Jul 21 2023 13:45:30 GMT+0530',
          amount: 30,
          coinValue: 0.003,
        },
      ],
    }
    render(
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>
    )
    const headerElement = screen.getByText('Trade')
    expect(headerElement).toBeInTheDocument

    const Wallet = screen.getByTestId('Wallet')
    expect(Wallet).toBeInTheDocument()

    fireEvent.click(Wallet)
    const Overview = screen.getByTestId('Overview')
    expect(Overview).toBeInTheDocument()

    fireEvent.click(Overview)

    const sellButton = screen.getByRole('button', { name: 'SELL' })
    expect(sellButton).toBeInTheDocument()
    fireEvent.click(sellButton)

    const buyButton = screen.getByRole('button', { name: 'BUY' })
    expect(buyButton).toBeInTheDocument()
    fireEvent.click(buyButton)
  })
})
