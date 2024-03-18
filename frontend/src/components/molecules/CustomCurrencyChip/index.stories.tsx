import React from 'react'
import { action } from '@storybook/addon-actions'
import CustomCurrencyChip from '.'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Molecules/CustomCurrencyChip',
  component: CustomCurrencyChip,
  argTypes: {
    color: /(background|color)$/i,
  },
} as Meta<typeof CustomCurrencyChip>
const Template: StoryFn<typeof CustomCurrencyChip> = (args: any) => (
  <CustomCurrencyChip {...args} />
)
export const Default = Template.bind({})

Default.args = {
  color: '##F7931A',
  label: 'Bitcoin',
  isActive: false,
}
