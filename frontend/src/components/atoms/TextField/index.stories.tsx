import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { InputField } from '.'
import theme from '../../../theme'
import { ThemeProvider } from '@mui/material'

export default {
  title: 'Atoms/InputField',
  component: InputField,
  argTypes: {
    variant: {
      options: ['standard', 'outlined', 'filled'],
      control: { type: 'select' },
    },
    label: {
      control: { type: 'text' },
    },

    helperText: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: 'text',
    },

    select: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
  },
} as Meta<typeof InputField>

const temp: StoryFn<typeof InputField> = (args) => (
  <ThemeProvider theme={theme}>
    <InputField {...args} />
  </ThemeProvider>
)

export const TextField = temp.bind({})
TextField.args = {
  variant: 'outlined',
  placeholder: 'Placeholder',
  inputSize: '0.8rem',
  width: '15vw',
  height: '5vh',
}
export const TextFieldWithEndIcon = temp.bind({})
TextFieldWithEndIcon.args = {
  variant: 'outlined',
  endicon: (
    <img src="../assets/icons/search.svg" width="70%" alt="img not found" />
  ),
  placeholder: 'Placeholder',
  onChange: () => {
    console.log('onChange')
  },
  inputSize: '0.8rem',
  width: '15vw',
  height: '5vh',
}
