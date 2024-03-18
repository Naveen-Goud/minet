import { render, screen } from '@testing-library/react'
import { DashboardFooter } from '.'
import { FooterCaptions, FooterYear } from '../../../utils/constants'
import '@testing-library/jest-dom'
describe('DashboardFooter', () => {
  test('renders footer captions and year', () => {
    render(<DashboardFooter />)

    FooterCaptions.forEach((caption) => {
      const captionElement = screen.getByText(caption)
      expect(captionElement).toBeInTheDocument()
    })

    const yearElement = screen.getByText(FooterYear)
    expect(yearElement).toBeInTheDocument()
  })

  test('renders footer button with correct label', () => {
    render(<DashboardFooter />)

    const buttonElement = screen.getByRole('button', { name: 'Need Help' })
    expect(buttonElement).toBeInTheDocument()
  })
})
