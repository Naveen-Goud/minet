import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import PurchasePage from '.'
import '@testing-library/jest-dom'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')

describe('PurchasePage component', () => {

  const mockData = [
    {
      id: 1,
      acronym: 'BTC',
      name: 'Bitcoin',
      currentPrice: 34000,
      iconUrl: 'https://example.com/btc-icon.png',
    },
  ]

  it('should render the PurchasePage correctly', async () => {
    axios.get.mockResolvedValue({ data: mockData })
    render(<BrowserRouter><PurchasePage /></BrowserRouter>)
    await waitFor(() => screen.getByText(/buy crypto/i))
    expect(screen.getByText(/buy crypto/i)).toBeInTheDocument()
    expect(screen.getByText(/amount details/i)).toBeInTheDocument()
    act(() => {
      screen.getByText(/buy now/i).click()
    })
    await waitFor(() => screen.getByText(/purchase is completed/i))
    expect(screen.getByText(/purchase is completed/i)).toBeInTheDocument()

    const button= screen.getByRole('button',{name: 'GO TO USD COIN'})
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
