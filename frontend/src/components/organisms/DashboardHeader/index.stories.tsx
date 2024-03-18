import { StoryFn, Meta } from '@storybook/react'
import DashboardHeader from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@mui/material'

export default {
  title: 'Organisms/DashboardHeader',
  component: DashboardHeader,
} as Meta<typeof DashboardHeader>

const Template: StoryFn<typeof DashboardHeader> = () => (
  <ThemeProvider theme={theme}>
    <DashboardHeader headerContent={'Dashboard'} sellEnabled={false} buyEnabled={false} />
  </ThemeProvider>
)

export const Dashboardheader = Template.bind({})
