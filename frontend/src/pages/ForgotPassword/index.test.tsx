import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import * as router from 'react-router'
import ForgotPassword from '.'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { when } from 'jest-when'
import { apiBase } from '../../utils/constants'
import { changePassword } from './utils'

jest.mock('axios')
jest.spyOn(window, 'alert').mockImplementation()

const navigate = jest.fn()

describe('ForgotPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle email verification when email is not found', async () => {
    const mockResponseWithoutData = {
      data: [],
      status: 404,
    }

    axios.get.mockResolvedValue(mockResponseWithoutData)

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const emailButton = screen.getByText('Send Reset Link')

    await act(async () => {
      fireEvent.change(emailInput, {
        target: { value: 'nonexistent@example.com' },
      })
      fireEvent.click(emailButton)
    })

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1)
    })
  })

  it('should handle email validation with 500 status  code', async () => {
    const spyAxios = jest.spyOn(axios, 'get')
    when(spyAxios)
      .calledWith(`${apiBase}/users`, {
        params: { email: 'error@example.com' },
      })
      .mockReturnValue(Promise.resolve({ data: [], status: 500 }))

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const emailButton = screen.getByText('Send Reset Link')

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'error@example.com' } })
      await fireEvent.click(emailButton)
    })

    await waitFor(() => {
      expect(window.alert).toBeCalledTimes(1)
    })
  })
  it('should handle reset verification with valid reset code', async () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    const mockResponseWithData = {
      data: [{ id: 123 }],
      status: 200,
    }

    const mockResponseWithoutData = {
      status: 404,
    }

    axios.get.mockImplementation(async (url, config) => {
      if (config.params && config.params.email === 'user@example.com') {
        return mockResponseWithData
      } else if (config.params && config.params.resetCode === '65432123') {
        return mockResponseWithoutData
      } else {
        return { status: 500, data: [] }
      }
    })

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const emailButton = screen.getByText('Send Reset Link')

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
      await fireEvent.click(emailButton)
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('8 digits code')).toBeInTheDocument()
    })

    const resetCodeInput = screen.getByPlaceholderText('8 digits code')
    const resetButton = screen.getByText('Reset Password')

    await act(async () => {
      fireEvent.change(resetCodeInput, { target: { value: '65432123' } })
      await fireEvent.click(resetButton)
    })
  })

  it('should handle reset verification with invalid reset code', async () => {
    const spyAxios = jest.spyOn(axios, 'get')
    when(spyAxios)
      .calledWith(`${apiBase}/users`, { params: { email: 'user@example.com' } })
      .mockReturnValue(Promise.resolve({ data: [{ id: 123 }], status: 200 }))
    when(spyAxios)
      .calledWith(`${apiBase}/users`, {
        params: { email: 'user@example.com', resetCode: 12345675 },
      })
      .mockReturnValue(Promise.resolve({ data: [], status: 404 }))

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const emailButton = screen.getByText('Send Reset Link')

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
      await fireEvent.click(emailButton)
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('8 digits code')).toBeInTheDocument()
    })

    const resetCodeInput = screen.getByPlaceholderText('8 digits code')
    const resetButton = screen.getByText('Reset Password')

    await act(async () => {
      fireEvent.change(resetCodeInput, { target: { value: '12345675' } })
      await fireEvent.click(resetButton)
    })

    await act(async () => {
      expect(window.alert).toBeCalledTimes(1)
    })
  })
  it('should handle thrown error during email verification', async () => {
    const spyAxios = jest.spyOn(axios, 'get')
    const consoleErrorSpy = jest.spyOn(console, 'error')
    when(spyAxios)
      .calledWith(`${apiBase}/users`, {
        params: { email: 'error@example.com' },
      })
      .mockRejectedValueOnce(new Error('error ocurred'))

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const emailButton = screen.getByText('Send Reset Link')

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'error@example.com' } })
      await fireEvent.click(emailButton)
    })

    await waitFor(() => {
      expect(consoleErrorSpy).toBeCalledTimes(1)
    })
  })
  it('should handle thrown error during reset code verification', async () => {
    const spyAxios = jest.spyOn(axios, 'get')
    const consoleErrorSpy = jest.spyOn(console, 'error')
    when(spyAxios)
      .calledWith(`${apiBase}/users`, { params: { email: 'user@example.com' } })
      .mockReturnValue(Promise.resolve({ data: [{ id: 123 }], status: 200 }))
    when(spyAxios)
      .calledWith(`${apiBase}/users`, {
        params: { email: 'user@example.com', resetCode: 12345675 },
      })
      .mockRejectedValueOnce(new Error('error ocurred'))

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const emailButton = screen.getByText('Send Reset Link')

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
      await fireEvent.click(emailButton)
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('8 digits code')).toBeInTheDocument()
    })

    const resetCodeInput = screen.getByPlaceholderText('8 digits code')
    const resetButton = screen.getByText('Reset Password')

    await act(async () => {
      fireEvent.change(resetCodeInput, { target: { value: '12345675' } })
      await fireEvent.click(resetButton)
    })

    await act(async () => {
      expect(consoleErrorSpy).toBeCalledTimes(1)
    })
  })
  it('should handle reset verification with 500 status code', async () => {
    const spyAxios = jest.spyOn(axios, 'get')
    when(spyAxios)
      .calledWith(`${apiBase}/users`, { params: { email: 'user@example.com' } })
      .mockReturnValue(Promise.resolve({ data: [{ id: 123 }], status: 200 }))
    when(spyAxios)
      .calledWith(`${apiBase}/users`, {
        params: { email: 'user@example.com', resetCode: 12345675 },
      })
      .mockReturnValue(Promise.resolve({ data: [], status: 500 }))

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const emailButton = screen.getByText('Send Reset Link')

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
      await fireEvent.click(emailButton)
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('8 digits code')).toBeInTheDocument()
    })

    const resetCodeInput = screen.getByPlaceholderText('8 digits code')
    const resetButton = screen.getByText('Reset Password')

    await act(async () => {
      fireEvent.change(resetCodeInput, { target: { value: '12345675' } })
      await fireEvent.click(resetButton)
    })

    await act(async () => {
      expect(window.alert).toBeCalledTimes(1)
    })
  })
  it('should make change password request and handle success status', async () => {
    const userId = 1
    const password = 'Test@123'
    const axiosSpy = jest.spyOn(axios, 'patch')
    when(axiosSpy)
      .calledWith(`${apiBase}/users/${userId}`, {
        password: password,
      })
      .mockResolvedValue({ status: 204 })
    await changePassword(userId, password)
  })
  it('should make change password request and handle error', async () => {
    const userId = 1
    const password = 'Test@123'
    const axiosSpy = jest.spyOn(axios, 'patch')
    when(axiosSpy)
      .calledWith(`${apiBase}/users/${userId}`, {
        password: password,
      })
      .mockRejectedValue({})
    await changePassword(userId, password)
    const consoleErrorSpy = jest.spyOn(console, 'error')

    await act(async () => {
      expect(consoleErrorSpy).toBeCalledTimes(1)
    })
  })
})
