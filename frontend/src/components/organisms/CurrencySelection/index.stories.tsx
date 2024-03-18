import { ThemeProvider } from '@emotion/react'
import CurrencySelection, { CurrencySelectionProps } from '.'
import { Meta, StoryFn } from '@storybook/react'
import theme from '../../../theme'

const currencySelectionData: Array<{
  id: number
  label: string
  color: string
}> = [
  {
    id: 1,
    label: 'Bitcoin',
    color: 'rgba(247, 147, 26, 0.20)',
  },
  {
    id: 2,
    label: 'XRP',
    color: 'rgba(34, 34, 34, 0.20)',
  },
  {
    id: 3,
    label: 'Polkadot',
    color: 'rgba(230, 0, 122, 0.20)',
  },
  {
    id: 4,
    label: 'Ethereum',
    color: 'rgba(98, 126, 234, 0.20)',
  },
  {
    id: 5,
    label: 'Tether',
    color: 'rgba(38, 161, 123, 0.20)',
  },
  {
    id: 6,
    label: 'Ethereum 2',
    color: 'rgba(25, 25, 113, 0.20)',
  },
  {
    id: 7,
    label: 'Dodge Coin',
    color: 'rgba(219, 201, 132, 0.20)',
  },
]

export default {
  title: 'Organisms/CurrencySelection',
  component: CurrencySelection,
} as Meta<typeof CurrencySelection>

const Template: StoryFn<typeof CurrencySelection> = (
  args: CurrencySelectionProps
) => (
  <ThemeProvider theme={theme}>
    <CurrencySelection {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})

Default.args = {
  currencyList: currencySelectionData,
  getSelectedIdOnClick(id) {
    console.log(id)
  },
}
