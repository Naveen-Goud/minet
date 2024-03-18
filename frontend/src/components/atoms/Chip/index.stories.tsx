import { Story, Meta } from '@storybook/react'
import { CustomChip } from '.'

export default {
  title: 'Atoms/Chip',
  component: CustomChip,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: Story<typeof CustomChip> = (args) => <CustomChip {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Chip 1',
}

export const Clickable = Template.bind({})
Clickable.args = {
  label: 'Clickable Chip',
}
