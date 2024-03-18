import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import SliderComponent from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@emotion/react'
export default {
  title: 'Atoms/Slider',
  component: SliderComponent,
} as Meta

const Template: StoryFn<typeof SliderComponent> = (args) => (
  <ThemeProvider theme={theme}>
    <SliderComponent {...args} />
  </ThemeProvider>
)

export const Slider = Template.bind({})
Slider.args = {
  min: 5,
  max: 50,
  value: 10,
}
