import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import theme from '../../../theme'
import { ThemeProvider } from '@emotion/react'
import { CustomStepper } from '.'

export default {
  title: 'Molecules/Stepper',
  component: CustomStepper,
} as Meta

const Template: StoryFn<typeof CustomStepper> = (args) => (
  <ThemeProvider theme={theme}>
    <CustomStepper {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  steps: [
    {
      label1: 'Paying through',
      label2: 'Bitcoin wallet',
      icon: '../assets/icons/Group 43.svg',
    },
    {
      label1: 'Delivery fees',
      label2: '0.005 ETH',
      icon: '../assets/icons/Frame 212.svg',
    },
    {
      label1: 'Deposit to',
      label2: 'Rupee Coin',
      icon: '../assets/icons/Frame 213.svg',
    },
  ],
  activeStep: 1,
}
