import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { CustomChip } from '.'

describe('CustomChip', () => {
  test('renders chip with provided label', () => {
    render(<CustomChip label="Test Chip" variant={'outlined'} />)
    const chip = screen.getByTestId('chip')
    expect(chip).toBeInTheDocument()
  })
})
