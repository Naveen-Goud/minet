import { Chip, SxProps} from '@mui/material'
import React from 'react'

export interface ChipProps {
  label?: string
  onClick?: () => void
  color?: 'default' | 'primary' | 'secondary'
  variant: 'outlined' | 'filled'
  sx?: SxProps
  disabled?: boolean
}

export const CustomChip = (props: ChipProps) => {
  return (
      <Chip
        data-testid="chip"
        label={props.label}
        onClick={props.onClick}
        color={props.color}
        variant={props.variant}
        sx={props.sx}
        disabled={props.disabled}
      /> 
  )
}

export default CustomChip;