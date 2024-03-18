import { render, screen } from '@testing-library/react'
import Image from './index'
import '@testing-library/jest-dom'
import React from 'react'

describe('Image', () => {
  test('renders image with provided id', () => {
    render(<Image src="" alt="Test Image" id="test-image" />)
    const imageElement = screen.getByAltText('Test Image')
    expect(imageElement).toBeInTheDocument
  })
})
