import React from 'react'
import MuiAvatar from '@mui/material/Avatar'
import { SxProps } from '@mui/material'

interface AvatarProps {
  src?: string
  alt?: string
  sx?: SxProps
  onClick?: () => void
}

export const Avatar = (props: AvatarProps) => {
  return <MuiAvatar {...props} />
}
