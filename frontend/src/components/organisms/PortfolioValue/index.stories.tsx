import PortfolioValue, { ProtfolioValueProps } from '.'
import { Meta, StoryFn } from '@storybook/react'
const data = [
  {
    id: 'Bitcoin',
    color: '#B71A33',
    data: [
      { x: '2023-06-26', y: 220 },
      { x: '2023-06-27', y: 230 },
      { x: '2023-06-28', y: 225 },
      { x: '2023-06-29', y: 240 },
      { x: '2023-06-30', y: 235 },
      { x: '2023-07-01', y: 250 },
      { x: '2023-07-02', y: 245 },
      { x: '2023-07-03', y: 260 },
    ],
  },
  {
    id: 'Total Investment',
    color: '#0052FF',
    data: [
      { x: '2023-06-26', y: 320 },
      { x: '2023-06-27', y: 330 },
      { x: '2023-06-28', y: 325 },
      { x: '2023-06-29', y: 340 },
      { x: '2023-06-30', y: 335 },
      { x: '2023-07-01', y: 350 },
      { x: '2023-07-02', y: 345 },
      { x: '2023-07-03', y: 360 },
    ],
  },
]

export default {
  title: 'Organisms/PortfolioValue',
  component: PortfolioValue,
} as Meta<typeof PortfolioValue>

const Template: StoryFn<typeof PortfolioValue> = (
  args: ProtfolioValueProps
) => <PortfolioValue {...args} />

export const Empty = Template.bind({})
Empty.args = {}

export const WithData = Template.bind({})
WithData.args = {
  graphData: data,
  totalInvestmentValue: '$ 11,900.204',
  isInvestmentUp: false,
  investmentPercentageChange: 1.2,
  coinType: 'Bitcoin',
  coinValue: '$ 12,400',
  isCoinUp: true,
  coinPercentageChange: 8.2,
}
