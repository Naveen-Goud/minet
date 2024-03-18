import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import ChooseCrypto from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@emotion/react'

export default {
  title: 'Organisms/ChooseCrypto',
  component: ChooseCrypto,
} as Meta

const Template: StoryFn<typeof ChooseCrypto> = (args) => (
  <ThemeProvider theme={theme}>
    <ChooseCrypto {...args}/>
  </ThemeProvider>
)
const items = [
  { id: 1, name: 'Bitcoin', price: 3406069.54, iconUrl : "../assets/icons/bitcoin.svg"},
  { id: 2, name: 'Ethereum', price: 1297, iconUrl: "../assets/icons/ethereum.svg"},
  { id: 3, name: 'Binance',price: 30054, iconUrl: "../assets/icons/binance.svg" },
  { id: 4, name: 'Tether',price: 74.21, iconUrl: "../assets/icons/tether.svg"},
  { id: 5, name: 'Cardano', price: 138.22, iconUrl: "../assets/icons/cardano.svg"},
  { id: 6, name: 'XRP', price: 76, iconUrl: "../assets/icons/XRP.svg"},
  { id: 7, name: 'Dogecoin', price: 21.37,iconUrl: "../assets/icons/dogecoin.svg"},
  { id: 8, name: 'Polkadot', price: 1632.39,iconUrl: "../assets/icons/polkadot.svg"},
];

export const Choosecrypto = Template.bind({})
Choosecrypto.args = {
items: items
}