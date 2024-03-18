import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ResetPassword } from '.'

describe('testing the reset password page', () => {
  test('testing for the title', () => {
    render(<ResetPassword reset={false} />)
    const title = screen.getAllByText('Reset Password')
    expect(title).toBeInTheDocument
  }),
    it('should disable the submit button when fields are empty', () => {
      const props = {
        handleLoginButtonClick: jest.fn(),
        handleResetClick: jest.fn(),
        reset: false,
      }
      render(<ResetPassword {...props} />)

      const submitButton = screen.getByRole('button', {
        name: /Reset Password/i,
      })
      expect(submitButton).toBeDisabled
    }),
    it('shows an error message when the password length is less than 8 characters', () => {
      const props = {
        handleLoginButtonClick: jest.fn(),
        handleResetClick: jest.fn(),
        reset: false,
      }
      render(<ResetPassword {...props} />)

      const passwordInput = screen.getByPlaceholderText('Enter new password')
      fireEvent.change(passwordInput, { target: { value: 'pass' } })

      const errorMessage = screen.getByText(
        'Password must be at least 8 characters long.'
      )
      expect(errorMessage).toBeInTheDocument
    })

  it('enables the submit button when passwords match and meet the length requirement', () => {
    const props = {
      handleLoginButtonClick: jest.fn(),
      handleResetClick: jest.fn(),
      reset: false,
    }
    const { getByPlaceholderText, getByRole } = render(
      <ResetPassword {...props} />
    )

    const passwordInput = getByPlaceholderText('Enter new password')
    const reenterPasswordInput = getByPlaceholderText('Re-enter new password')
    const submitButton = getByRole('button', { name: /Reset Password/i })

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(reenterPasswordInput, { target: { value: 'password123' } })

    expect(passwordInput.getAttribute('value')).toBe('password123')
    expect(reenterPasswordInput.getAttribute('value')).toBe('password123')
    expect(submitButton).not.toBeDisabled
  })

  it('toggles the visibility of the password', () => {
    const props = {
      handleLoginButtonClick: jest.fn(),
      handleResetClick: jest.fn(),
      reset: false,
    }
    render(<ResetPassword {...props} />)

    const passwordInput = screen.getByPlaceholderText('Enter new password')
    const reenterPasswordInput = screen.getByPlaceholderText(
      'Re-enter new password'
    )
    const visibilityToggle = screen.getByRole('button', {
      name: /Reset Password/i,
    })

    fireEvent.click(visibilityToggle)
    expect(passwordInput.getAttribute('type')).toBe('password')
    expect(reenterPasswordInput.getAttribute('type')).toBe('password')

    fireEvent.click(visibilityToggle)
    expect(passwordInput.getAttribute('type')).toBe('password')
    expect(reenterPasswordInput.getAttribute('type')).toBe('password')
  })

  it('handles form submission', () => {
    const handleResetClick = jest.fn()
    const props = {
      handleLoginButtonClick: jest.fn(),
      handleResetClick: handleResetClick,
      reset: false,
    }
    const { getByPlaceholderText, getByRole } = render(
      <ResetPassword {...props} />
    )

    const passwordInput = getByPlaceholderText('Enter new password')
    const reenterPasswordInput = getByPlaceholderText('Re-enter new password')
    const submitButton = getByRole('button', { name: /Reset Password/i })

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(reenterPasswordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    expect(handleResetClick).toHaveBeenCalled()
    expect(props.handleResetClick).toHaveBeenCalled()
  })
})
