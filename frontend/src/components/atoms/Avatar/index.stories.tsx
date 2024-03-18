import React from 'react'

import { StoryFn, Meta } from '@storybook/react'
import { Avatar } from '.'

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />

export const PrimaryAvatar = Template.bind({})

PrimaryAvatar.args = {
  src: '../assets/icons/Avatar.svg',
  alt: 'MinetAvatar',
  sx: { width: 56, height: 56 },
}
