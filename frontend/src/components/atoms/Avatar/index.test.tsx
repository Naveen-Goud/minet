import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Avatar } from '.'

describe('avatarTest', () => {
  test('avatar renders correctly', () => {
    render(<Avatar src="./assets/Avatar.svg" alt="PocketPayAvatar" />)
    const avatarTest = screen.getByRole('img')
    expect(avatarTest).toBeInTheDocument()
    const avatarTest1 = screen.getByAltText('PocketPayAvatar')
    expect(avatarTest1).toBeInTheDocument()
  })
})
