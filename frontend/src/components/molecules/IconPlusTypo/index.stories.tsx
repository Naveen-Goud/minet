import React from 'react'
import { Story, Meta } from '@storybook/react'

import IconPlusTypo, { IconPlusTypoProps } from '.'

export default {
  title: 'Molecules/IconPlusTypo',
  component: IconPlusTypo,
} as Meta

const Template: Story<IconPlusTypoProps> = (args) => <IconPlusTypo {...args} />

export const Google = Template.bind({})
Google.args = {
  iconSrc: 'assets/icons/google.svg',
  labelText: 'Google',
}

export const Facebook = Template.bind({})
Facebook.args = {
  iconSrc: 'assets/icons/stripe.svg',
  labelText: 'Facebook',
}
