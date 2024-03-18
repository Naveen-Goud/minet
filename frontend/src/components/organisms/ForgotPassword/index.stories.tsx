import { StoryFn, Meta } from '@storybook/react'
import { ForgotPassword } from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@mui/material'

export default {
  title: 'Organisms/ForgotPassword',
  component: ForgotPassword,
} as Meta<typeof ForgotPassword>

const Template: StoryFn<typeof ForgotPassword> = (args) => (
  <ThemeProvider theme={theme}>
    <ForgotPassword {...args}/>
  </ThemeProvider>
)

export const ForgotpasswordEmail = Template.bind({})
ForgotpasswordEmail.args = {
  reset: false,
  handleResetClick: null,
  handleEmailButtonClick: null
}

export const ForgotpasswordReset = Template.bind({})
ForgotpasswordReset.args = {
  reset: true,
  handleResetClick: null,
  handleEmailButtonClick: null
}