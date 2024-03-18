import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { TextIcon } from '.'

export default {
  title: 'Molecules/TextIcon',
  component: TextIcon,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof TextIcon> = (args) => (
  <ThemeProvider theme={theme}>
    <TextIcon {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  children: 'English',
  sx: {
    width: '10vw',
    height: '5vh',
    py: '1vh',
    px: '1vw',
    border: '1px solid' + theme.palette.gray[100],
    backgroundColor: theme.palette.gray.white,
  },
  src: '../assets/icons/chervondown.svg',
  variant: 'b2',
}
