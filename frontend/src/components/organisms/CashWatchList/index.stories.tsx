import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import CashWatchlist from "."
export default {
  title: 'Organisms/CashWatchlist',
  component: CashWatchlist,
} as Meta

const Template: StoryFn<typeof CashWatchlist> = () => (
  <ThemeProvider theme={theme}>
    <CashWatchlist />
  </ThemeProvider>
)

export const Cashwatchlist = Template.bind({})
