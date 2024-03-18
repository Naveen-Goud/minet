import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import TypographyComponent, { TypographyProps } from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@emotion/react'

export default {
  title: 'Atoms/Typography',
  component: TypographyComponent,
  argTypes: {
    variant: {
      options: [
        'h4',
        'h6',
        'subtitle1',
        'subtitle2',
        'b1',
        'b2',
        'c1',
        'c2',
        'button',
        'overline',
      ],
      control: { type: 'radio' },
    },
    children: {
      control: { type: 'text' },
    },
  },
} as Meta

const Template: StoryFn<TypographyProps> = (args) => (
  <ThemeProvider theme={theme}>
    <TypographyComponent {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  variant: 'b1',
  children: 'Hello, world',
  style: { color: theme.palette.text.lowemp },
}
