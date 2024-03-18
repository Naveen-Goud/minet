import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { AllAssets } from '.'
import { AllAssetRows } from '../../../utils/constants'

export default {
  title: 'Organisms/AllAssets',
  component: AllAssets,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof AllAssets> = (args) => (
  <ThemeProvider theme={theme}>
    <AllAssets {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  rows: AllAssetRows,
}
