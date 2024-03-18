import { render, fireEvent } from '@testing-library/react'
import CustomCurrencyChip from '.'
import '@testing-library/jest-dom/extend-expect'

describe('CustomCurrencyChip', () => {
  test('renders label correctly', () => {
    const label = 'Bitcoin'
    const { getByText } = render(
      <CustomCurrencyChip
        label={label}
        color="#FFD700"
        onClick={jest.fn()}
        isActive={false}
      />
    )
    const labelElement = getByText(label)
    expect(labelElement).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <CustomCurrencyChip
        label="Bitcoin"
        color="#FFD700"
        onClick={onClick}
        isActive={false}
      />
    )
    const chipElement = getByTestId('custom-currency-chip')
    fireEvent.click(chipElement)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
