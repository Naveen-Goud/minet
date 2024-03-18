import type { Preview } from '@storybook/react'
import theme from '../src/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}
export default preview
