import React from 'react'
import { Story, Meta } from '@storybook/react'
import PortfolioCard, { PortfolioCardProps } from '.'

export default {
  title: 'Molecules/PortfolioCard',
  component: PortfolioCard,
} as Meta

const Template: Story<PortfolioCardProps> = (args) => (
  <PortfolioCard {...args} />
)

export const Bitcoin = Template.bind({})
Bitcoin.args = {
  iconSrc: 'assets/icons/bitcoin.svg',
  currencyType: 'Bitcoin',
  currencyValue: '$ 0.00',
  currencyAcronym: 'BTC',
  isProfit: true,
  profitLoss: '+ 0.00%',
}
export const Ethereum = Template.bind({})
Ethereum.args = {
  iconSrc: 'assets/icons/ethereum.svg',
  currencyType: 'Ethereum',
  currencyValue: '$ 0.00',
  currencyAcronym: 'ETH',
  isProfit: false,
  profitLoss: '- 0.00%',
}
