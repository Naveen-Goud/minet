import React from 'react'
import {
  render,
  fireEvent,
  getAllByRole,
  screen,
  getByPlaceholderText,
  getAllByPlaceholderText,
} from '@testing-library/react'
import Login from '.'

describe('Login component', () => {
  test('renders without errors', () => {
    render(<Login />)
  })

  test('initial state', () => {
    const { getByLabelText } = render(<Login />)
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    expect(emailInput.value).toBe('')
    expect(passwordInput.value).toBe('')
    expect(emailInput.getAttribute('error')).toBeNull()
    expect(passwordInput.getAttribute('error')).toBeNull()
  })

  test('input field behavior', () => {
    const { getByLabelText, getByAltText } = render(
      <Login handleGoogleLogin={() => {}} getFormDataOnSubmit={() => {}} />
    )
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput.value).toBe('test@example.com')

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    expect(passwordInput.value).toBe('password123')

    fireEvent.focus(emailInput)
    expect(emailInput.getAttribute('error')).toBeNull()

    fireEvent.focus(passwordInput)
    expect(passwordInput.getAttribute('error')).toBeNull()

    // Test showing password
    const eyeIcon = getByAltText('Toggle Password Visibility')
    fireEvent.click(eyeIcon)
    expect(passwordInput.getAttribute('type')).toBe('text')

    // Test hiding password
    fireEvent.click(eyeIcon)
    expect(passwordInput.getAttribute('type')).toBe('password')

    // Test error flags
    fireEvent.blur(emailInput)
    fireEvent.blur(passwordInput)
    expect(emailInput.classList.contains('Mui-error')).toBeFalsy()
    expect(passwordInput.classList.contains('Mui-error')).toBeFalsy()
  })

  test('form submission', () => {
    const mockHandleSubmit = jest.fn()
    const { getByLabelText, getByText } = render(
      <Login
        getFormDataOnSubmit={mockHandleSubmit}
        handleGoogleLogin={() => {}}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password&123' },
    })

    fireEvent.click(getByText('Sign In'))

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password&123',
    })
  })
})
