import { Stack, SxProps } from '@mui/material'
import React from 'react'
import TypographyComponent from '../../atoms/Typography'
import Image from '../../atoms/Image'
interface TextIconProps {
  onclick?: any
  variant:
    | 'h4'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'b1'
    | 'b2'
    | 'c1'
    | 'c2'
    | 'button'
    | 'overline'
  children: React.ReactNode
  src: string
  sx?: SxProps
}

export const TextIcon = (props: TextIconProps) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={props.sx}
    >
      <TypographyComponent variant={props.variant}>
        {props.children}
      </TypographyComponent>
      <Image src={props.src} onClick={props.onclick} alt="Dropdown Image" />
    </Stack>
  )
}
