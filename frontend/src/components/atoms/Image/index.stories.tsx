import { Meta, StoryFn } from '@storybook/react'
import Image from '.'

export default {
  title: 'Atoms/Image',
  component: Image,
  argTypes: {
    width: {
      control: {
        type: 'number',
      },
    },
    height: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta<typeof Image>

const temp: StoryFn<typeof Image> = (args) => <Image {...args} />

export const Primary = temp.bind({})
Primary.args = {
  src: '../assets/icons/minet.svg',
  alt: 'image not found',
}
