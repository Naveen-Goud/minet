import { StoryFn, Meta } from '@storybook/react'
import TimePeriodTabs from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@mui/material'

export default {
  title: 'Molecules/TimePeriodTabs',
  component: TimePeriodTabs,
} as Meta<typeof TimePeriodTabs>

const Template: StoryFn<typeof TimePeriodTabs> = (args) => (
  <ThemeProvider theme={theme}>
    <TimePeriodTabs {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  clicked: false,
}
export const Clicked = Template.bind({})
Clicked.args = {
  clicked: true,
}
export const ClickedRounded = Template.bind({})
ClickedRounded.args = {
  clicked: true,
  rounded: true
}
