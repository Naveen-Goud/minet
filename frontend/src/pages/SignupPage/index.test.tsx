import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SignUpPage } from '.'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

describe('SignUpPage', () => {
  test('handles signup successfully', async () => {
    const spyAxios = jest.spyOn(axios, 'post')
    spyAxios.mockResolvedValueOnce({ status: 201 })

    const { container } = render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    )

    const name = container.querySelector('#inputField0') as HTMLInputElement
    fireEvent.change(name, {
      target: { value: 'John Doe' },
    })

    const email = container.querySelector('#inputField1') as HTMLInputElement
    fireEvent.change(email, {
      target: { value: 'john@example.com' },
    })

    const password = container.querySelector('#inputField2') as HTMLInputElement
    fireEvent.change(password, {
      target: { value: 'Password@123' },
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    })

    await waitFor(() => expect(spyAxios).toHaveBeenCalledTimes(1))
  })
})
