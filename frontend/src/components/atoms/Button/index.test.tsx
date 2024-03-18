import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomButton from '.'

test('Should Render a Button', () => {
  render(<CustomButton variant="contained">Hello world</CustomButton>)
  const element = screen.getByText('Hello world')
  expect(element).toBeInTheDocument
})

test('Should Render a Button with outline', () => {
  render(<CustomButton variant="outlined">Button</CustomButton>)
  const element = screen.getByText('Button')
  expect(element).toBeInTheDocument
})
