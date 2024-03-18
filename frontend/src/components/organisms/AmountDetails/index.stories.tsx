import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { AmountDetails } from '.'

export default {
  title: 'Organisms/AmountDetails',
  component: AmountDetails,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof AmountDetails> = (args) => (
  <ThemeProvider theme={theme}>
    <AmountDetails {...args} />
  </ThemeProvider>
)

export const Purchase = Template.bind({})
Purchase.args = {
  action: 'purchase',
  amount: 340000,
  cryptoValue: 34065,
  currency: 'BTC',
}
export const Sell = Template.bind({})
Sell.args = {
  action: 'sell',
  currencyValue: 1,
  cryptoValue: 34065,
  currency: 'BTC',
}
