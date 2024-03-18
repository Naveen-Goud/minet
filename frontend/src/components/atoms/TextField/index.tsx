import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import theme from '../../../theme'

interface InputFieldProps {
  variant?: 'standard' | 'filled' | 'outlined'
  label?: string
  type?: string
  placeholder?: string
  value?: string | number
  helperText?: string
  starticon?: React.ReactNode
  endicon?: React.ReactNode
  children?: React.ReactNode
  defaultValue?: string | number
  height?: string
  id?: string
  disabled?: boolean
  width?: string
  error?: boolean
  name?: string
  inputSize?: string
  onChange?: any
  bgcolor?: any
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const InputField = (props: InputFieldProps) => {
  return (
    <TextField
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onChange={props.onChange}
      InputProps={{
        style: {
          padding: '1vh 0.7vw',
        },
        sx: {
          fontStyle: theme.typography.b2,
          color: props.value
            ? theme.palette.text.highemp
            : theme.palette.text.medemp,
          height: props.height,
          width: props.width,
          borderRadius: theme.spacing(1),
          borderColor: theme.palette.gray[100],
          paddingLeft: '1vw',
          fontSize: props.inputSize,
          '&:hover': {
            borderColor: theme.palette.gray[100],
          },
          backgroundColor: props.bgcolor,
        },
        startAdornment: (
          <InputAdornment sx={{ cursor: 'pointer' }} position="start">
            {props.starticon}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment sx={{ cursor: 'pointer' }} position="end">
            {props.endicon}
          </InputAdornment>
        ),
      }}
      autoComplete="off"
      {...props}
    />
  )
}
