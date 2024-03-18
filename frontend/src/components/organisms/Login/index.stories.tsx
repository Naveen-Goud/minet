import React from 'react'
import { Story, Meta } from '@storybook/react'
import Login, { LoginOrganismProps } from '.'

export default {
  title: 'Organisms/Login',
  component: Login,
} as Meta

const Template: Story<LoginOrganismProps> = (args) => <Login {...args} />

export const Default = Template.bind({})
Default.args = {
  handleGoogleLogin: () => {},
  getFormDataOnSubmit: () => {},
}
