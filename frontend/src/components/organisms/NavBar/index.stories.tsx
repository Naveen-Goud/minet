import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import NavBar from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@emotion/react'

export default {
  title: 'Organisms/NavBar',
  component: NavBar,
} as Meta

const Template: StoryFn<typeof NavBar> = () => (
  <ThemeProvider theme={theme}>
    <NavBar />
  </ThemeProvider>
)

export const Navbar = Template.bind({})
