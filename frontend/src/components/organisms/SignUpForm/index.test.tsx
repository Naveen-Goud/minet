import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import { SignUpForm } from '.'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'

describe('SignUp Form', () => {
  it('renders the Signup Form title correctly', () => {
    render(<BrowserRouter><SignUpForm /></BrowserRouter>)

    expect(screen.getByText('Signup with Minet')).toBeInTheDocument()
  })
  it('renders the Signup Form Name InputField correctly', () => {
    const { container } = render(<BrowserRouter><SignUpForm /></BrowserRouter>)
    const name = container.querySelector('#inputField0') as HTMLInputElement
    expect(name).toBeInTheDocument()
    act(() => {
      fireEvent.change(name, { target: { value: 'shaik' } })
    })
  })
  it('renders the Signup Form Email InputField correctly', () => {
    const { container } = render(<BrowserRouter><SignUpForm /></BrowserRouter>)
    const email = container.querySelector('#inputField1') as HTMLInputElement
    expect(email).toBeInTheDocument()
    act(() => {
      fireEvent.change(email, { target: { value: 'shaik' } })
    })
    act(() => {
      fireEvent.change(email, { target: { value: 'shaik@gmail.com' } })
    })
  })
  it('renders the Signup Form Password InputField correctly', () => {
    const { container } = render(<BrowserRouter><SignUpForm /></BrowserRouter>)
    const name = container.querySelector('#inputField2') as HTMLInputElement
    expect(name).toBeInTheDocument()
    act(() => {
      fireEvent.change(name, { target: { value: 'shaik' } })
    })
    act(() => {
      fireEvent.change(name, { target: { value: 'shaik@123' } })
    })
  })

  it('renders the Signup Form Password hide Function correctly', () => {
    render(<BrowserRouter><SignUpForm /></BrowserRouter>)
    const eye = screen.getByTestId('eye')
    expect(eye).toBeInTheDocument()

    fireEvent.click(eye)
    const Auth = screen.getAllByTestId('Auth0')
    expect(Auth[0]).toBeInTheDocument()
  })
})
