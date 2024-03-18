import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { DashboardFooter } from '.'

export default {
  title: 'Organisms/DashboardFooter',
  component: DashboardFooter,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof DashboardFooter> = () => (
  <ThemeProvider theme={theme}>
    <DashboardFooter />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {}
