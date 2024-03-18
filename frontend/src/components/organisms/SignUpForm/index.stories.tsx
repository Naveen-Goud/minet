import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { SignUpForm } from '.'

export default {
  title: 'Organisms/SignUpForm',
  component: SignUpForm,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof SignUpForm> = (args) => (
  <ThemeProvider theme={theme}>
    <SignUpForm {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {}
