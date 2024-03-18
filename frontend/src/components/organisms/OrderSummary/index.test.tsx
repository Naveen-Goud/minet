import { render, screen } from '@testing-library/react'
import { OrderSummary } from '.'
import { OrderAction, PaymentMethodCaptions } from '../../../utils/constants'
import '@testing-library/jest-dom'

describe('OrderSummary', () => {
  test('renders order summary component', () => {
    const props = {
      type: OrderAction,
      currency: '0.0234510 BTC',
      currencyCode: '1BTC',
      currencyValue: '$3,406,069.54',
      captions: PaymentMethodCaptions,
      convertedValue: '$34,000.00',
    }

    render(<OrderSummary {...props} />)

    expect(screen.getByText('You are buying')).toBeInTheDocument()
    expect(screen.getByText('PaymentMethod')).toBeInTheDocument()
    expect(screen.getByText('1BTC=$3,406,069.54')).toBeInTheDocument()
    expect(screen.getByText('$34,000.00')).toBeInTheDocument()
  })
})
