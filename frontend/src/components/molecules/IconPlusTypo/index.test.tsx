import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IconPlusTypo from '.'
import '@testing-library/jest-dom/extend-expect'

describe('IconPlusTypo', () => {
  const iconSrc = 'asset/icon/google.svg'
  const labelText = 'Google'
  const iconAlt = 'google'
  const onClick = jest.fn()

  afterEach(() => {
    onClick.mockClear()
  })

  it('renders the component with icon and label', () => {
    const { getByText, getByAltText } = render(
      <IconPlusTypo iconSrc={iconSrc} labelText={labelText} iconAlt={iconAlt} />
    )

    const labelElement = getByText(labelText)
    const iconElement = getByAltText('google')

    expect(labelElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(iconElement.getAttribute('src')).toBe(iconSrc)
  })

  it('calls onClick when the component is clicked', () => {
    const { container } = render(
      <IconPlusTypo iconSrc={iconSrc} labelText={labelText} onClick={onClick} />
    )

    fireEvent.click(container.firstChild!)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
