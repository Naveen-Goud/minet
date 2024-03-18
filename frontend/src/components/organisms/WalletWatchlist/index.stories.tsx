import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import WalletWatchlist from "."
const bitcoin = "../assets/icons/bitcoin.svg"

export default {
  title: 'Organisms/WalletWatchlist',
  component: WalletWatchlist,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof WalletWatchlist> = (args) => (
  <ThemeProvider theme={theme}>
    <WalletWatchlist {...args} />
  </ThemeProvider>
)

export const Walletwatchlist = Template.bind({})
Walletwatchlist.args = {
    imageSrc: bitcoin,
    name: "Bitcoin",
    currency: "BTC",
    number: 8.2,
    marketCap: "$64.2T",
    volume: "$2.9T",
    circulatingSupply: "18.8M BTC"
}
