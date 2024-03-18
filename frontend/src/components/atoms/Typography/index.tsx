import { Typography } from '@mui/material'
import React from 'react'

export interface TypographyProps{
    variant:"h4"|
    "h6"|
    "subtitle1"|
    "subtitle2"|
    "b1"|
    "b2"|
    "c1"|
    "c2"|
    "button"|
    "overline",
    children:React.ReactNode,
    style?:React.CSSProperties
    
}

const TypographyComponent = (props:TypographyProps) => {
    const{style,variant,children}=props
  return (
  <>
  <Typography  variant={variant} style={style}>{children}</Typography>
  </>
  )
}

export default TypographyComponent;
