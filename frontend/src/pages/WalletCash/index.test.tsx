import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import WalletCashPage from '.'

jest.mock('axios')
describe('Wallet Cash', () => {
  test('should handle Wallet Cash successfully', async () => {
    const walletData = {
      data: [{ balance: 34000 }],
    }
    axios.get.mockResolvedValue(walletData)

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
    axios.get.mockResolvedValue(transactionsData)

    render(
      <BrowserRouter>
        <WalletCashPage />
      </BrowserRouter>
    )
  })
})
