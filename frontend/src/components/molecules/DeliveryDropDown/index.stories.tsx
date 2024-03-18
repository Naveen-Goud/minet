import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import DeliveryDropdown from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@emotion/react'
export default {
  title: 'Molecules/DeliveryDropdown',
  component: DeliveryDropdown,
} as Meta

const Template: StoryFn<typeof DeliveryDropdown> = (args) => (
  <ThemeProvider theme={theme}>
    <DeliveryDropdown {...args} />
  </ThemeProvider>
)

export const Dropdown = Template.bind({})
Dropdown.args = {
  width: '600px',
}
