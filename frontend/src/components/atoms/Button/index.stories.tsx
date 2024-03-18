import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import CustomButton from './index'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../../theme'
import TypographyComponent from '../Typography'
import Image from '../Image'

export default {
  title: 'Atoms/Button',
  component: CustomButton,
} as Meta
const Template: StoryFn<typeof CustomButton> = ({ ...args }) => (
  <ThemeProvider theme={theme}>
    <CustomButton {...args}>Button</CustomButton>
  </ThemeProvider>
)
const IconTemplate: StoryFn<typeof CustomButton> = ({ ...args }) => (
  <ThemeProvider theme={theme}>
    <CustomButton {...args}>
      <Image
        src={'../assets/icons/star-outline.svg'}
        sx={{ marginRight: 3 }}
        width="18px"
        height="18px"
        alt="button"
      />
      <TypographyComponent variant="b1" children={'button'} />
    </CustomButton>
  </ThemeProvider>
)

export const ContainedButton = Template.bind({})
ContainedButton.args = {
  variant: 'contained',
  height: '40px',
  width: '100px',
}
export const OutlinedButton = Template.bind({})
OutlinedButton.args = {
  variant: 'outlined',
  height: '40px',
  width: '100px',
}

export const DisabledButton = Template.bind({})
DisabledButton.args = {
  variant: 'contained',
  height: '40px',
  width: '100px',
  disabled: true,
}
