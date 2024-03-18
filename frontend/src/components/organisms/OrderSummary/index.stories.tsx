import { StoryFn, Meta } from '@storybook/react'
import { OrderSummary } from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { OrderAction, PaymentMethodCaptions } from '../../../utils/constants'

export default {
  title: 'Organisms/OrderSummary',
  component: OrderSummary,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof OrderSummary> = (args) => (
  <ThemeProvider theme={theme}>
    <OrderSummary {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  type: OrderAction,
  currency: '0.0234510 BTC',
  currencyCode: '1BTC',
  currencyValue: '$3,406,069.54',
  captions: PaymentMethodCaptions,
  convertedValue: '$34,000.00',
}
