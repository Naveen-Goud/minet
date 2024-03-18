import { StoryFn, Meta } from '@storybook/react'
import { ResetPassword } from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@mui/material'

export default {
  title: 'Organisms/ResetPassword',
  component: ResetPassword,
} as Meta<typeof ResetPassword>

const Template: StoryFn<typeof ResetPassword> = (args) => (
  <ThemeProvider theme={theme}>
    <ResetPassword {...args}/>
  </ThemeProvider>
)

 
export const ForgotpasswordReset = Template.bind({})
ForgotpasswordReset.args = {
  reset: false,
  handleResetClick:'../components/atoms/Image/index.stories.tsx' ,
  handleLoginButtonClick:null
}