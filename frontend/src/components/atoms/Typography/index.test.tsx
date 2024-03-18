import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import TypographyComponent, { TypographyProps } from '.'

describe('TypographyComponent', () => {
  const defaultProps: TypographyProps = {
    variant: 'h4',
    children: 'Hello, world!',
    style: { fontWeight: 'bold' },
  }

  it('renders with the correct variant and children', () => {
    render(<TypographyComponent {...defaultProps} />)
    const typographyElement = screen.getByText('Hello, world!')
    expect(typographyElement).toBeInTheDocument()
    expect(typographyElement).toHaveClass('MuiTypography-h4')
  })

  it('applies the provided style', () => {
    render(<TypographyComponent {...defaultProps} />)
    const typographyElement = screen.getByText('Hello, world!')
    expect(typographyElement).toHaveStyle('font-weight: bold;')
  })
})
