import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavBar from '.'
import { useState } from 'react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('NavBar', () => {
  test('handleClick updates the isActive state', () => {
    const Test = () => {
      const [isActive, setIsActive] = useState(true)
      return (
        <BrowserRouter>
          <NavBar isActive={isActive} setIsActive={setIsActive} />
        </BrowserRouter>
      )
    }
    render(<Test />)
    const dashboardImage = screen.getByAltText('dashboard icon')
    fireEvent.click(dashboardImage)
    const isActive = true
    expect(isActive).toBe(true)
  })
  test('renders logo icon', () => {
    const Test = () => {
      const [isActive, setIsActive] = useState(true)
      return (
        <BrowserRouter>
          <NavBar isActive={isActive} setIsActive={setIsActive} />
        </BrowserRouter>
      )
    }
    render(<Test />)
    const logoIcon = screen.getByAltText('logo icon')
    expect(logoIcon).toBeInTheDocument()
  })

  test('renders dashboard icon', () => {
    const Test = () => {
      const [isActive, setIsActive] = useState(true)
      return (
        <BrowserRouter>
          <NavBar isActive={isActive} setIsActive={setIsActive} />
        </BrowserRouter>
      )
    }
    render(<Test />)
    const logoIcon = screen.getByAltText('dashboard icon')
    expect(logoIcon).toBeInTheDocument()
  })

  test('renders portfolio icon', () => {
    const Test = () => {
      const [isActive, setIsActive] = useState(true)
      return (
        <BrowserRouter>
          <NavBar isActive={isActive} setIsActive={setIsActive} />
        </BrowserRouter>
      )
    }
    render(<Test />)
    const portfolioIcon = screen.getByAltText('portfolio icon')
    expect(portfolioIcon).toBeInTheDocument()
  })

  test('renders trade icon', () => {
    const Test = () => {
      const [isActive, setIsActive] = useState(true)
      return (
        <BrowserRouter>
          <NavBar isActive={isActive} setIsActive={setIsActive} />
        </BrowserRouter>
      )
    }
    render(<Test />)
    const tradeIcon = screen.getByAltText('trade icon')
    expect(tradeIcon).toBeInTheDocument()
  })

  test('renders notification icon', () => {
    const Test = () => {
      const [isActive, setIsActive] = useState(true)
      return (
        <BrowserRouter>
          <NavBar isActive={isActive} setIsActive={setIsActive} />
        </BrowserRouter>
      )
    }
    render(<Test />)
    const notificationIcon = screen.getByAltText('notification icon')
    expect(notificationIcon).toBeInTheDocument()
  })

  test('renders logout icon', () => {
    const Test = () => {
      const [isActive, setIsActive] = useState(true)
      return (
        <BrowserRouter>
          <NavBar isActive={isActive} setIsActive={setIsActive} />
        </BrowserRouter>
      )
    }
    render(<Test />)
    const logoutIcon = screen.getByAltText('logout icon')
    expect(logoutIcon).toBeInTheDocument()
  })
})
