import { StoryFn, Meta } from '@storybook/react'
import PaymentSuccess from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'

export default {
  title: 'Organisms/PaymentSuccess',
  component: PaymentSuccess,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof PaymentSuccess> = (args) => (
  <ThemeProvider theme={theme}>
    <PaymentSuccess {...args} />
  </ThemeProvider>
)

export const Sell = Template.bind({})
Sell.args = {
    totalAmount:"0.2357",
    transactionType: "Sell" ,
    crypto: "ETH"
}
export const Purchase = Template.bind({})
Purchase.args = {
    totalAmount:"0.2357",
    transactionType: "Purchase" ,
    crypto: "ETH"
}
