import React from 'react'
import { Story, Meta } from '@storybook/react'

import Graph, { GraphProps } from '.'
import { Box } from '@mui/material'

export default {
  title: 'Atoms/Graph',
  component: Graph,
} as Meta

const Template: Story<GraphProps> = (args) => (
  <Box height="400px" width="700px">
    {' '}
    <Graph {...args} />{' '}
  </Box>
)
const cryptoData = [
  {
    id: 'ETH',
    color: '#0324fc',
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
    id: 'BTC',
    color: '#03fcb6',
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

const singleCryptoData = [
  {
    id: 'ETH',
    color: '#0324fc',
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
]
const margins = { top: 20, right: 20, bottom: 60, left: 80 }

const legendProps = {
  translateX: 0,
  translateY: -10,
  itemHeight: 14,
  itemWidth: 100,
  itemSpacing: 2,
  symbolSize: 8,
  itemTextColor: '#000',
}
export const DoubleGraph = Template.bind({})
DoubleGraph.args = {
  margins: margins,
  data: cryptoData,
  showXAxis: false,
  showYGridLines: false,
  gridYValues: [2000, 2500, 3000, 3500, 4000],
  showLegends: true,
  legendProps: legendProps,
}
export const SingleGraph = Template.bind({})
SingleGraph.args = {
  margins: margins,
  data: singleCryptoData,
  showYGridLines: true,
  legendProps: legendProps,
  gridYValues: [2000, 2500, 3000, 3500, 4000],
  showLegends: true,
}
