import { LoginPage } from '.'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { BackendUrl } from '../../utils/constants'
jest.mock('axios')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('LoginPage', () => {
  test('should fetch users and navigate to dashboard corrrectly', async () => {
    const navigateMock = jest.fn()
    useNavigate.mockReturnValue(navigateMock)
    const mockResponseData = [
      { id: 1, email: 'test1@example.com', password: 'password#1' },
      { id: 2, email: 'test2@example.com', password: 'password#2' },
    ]
    axios.get.mockResolvedValueOnce({ status: 200, data: mockResponseData })
    render(<LoginPage />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(BackendUrl + 'users')
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test1@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password#1' },
    })
    const button = screen.getByText('Sign In')
    fireEvent.click(button)
    expect(navigateMock).toHaveBeenCalledWith('/dashboard')
  })

  test('should handle error during fetch', async () => {
    const navigateMock = jest.fn()
    useNavigate.mockReturnValue(navigateMock)
    const errorMessage = 'Error fetching data'
    axios.get.mockRejectedValueOnce(new Error(errorMessage))
    render(<LoginPage />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(BackendUrl + 'users')
      expect(errorMessage).toBeInTheDocument
    })
  })
})
