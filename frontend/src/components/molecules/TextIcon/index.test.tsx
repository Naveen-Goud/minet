import { render, screen } from '@testing-library/react'
import { TextIcon } from '.'
import theme from '../../../theme'
import React from 'react'
import "@testing-library/jest-dom"

describe('TextIcon', () => {
  const props = {
    children: 'English',
    sx: {
      width: '10vw',
      height: '5vh',
      py: '1vh',
      px: '1vw',
      border: '1px solid' + theme.palette.gray[100],
      backgroundColor: theme.palette.gray.white,
    },
    src: '../assets/icons/chervondown.svg',
  }

  it('renders the text and image correctly', () => {
    render(<TextIcon variant='b2' {...props} />)

    expect(screen.getByText('English')).toBeInTheDocument()

    const imageElement = screen.getByRole('img')
    expect(imageElement).toBeInTheDocument()
  })
})
