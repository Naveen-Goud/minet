import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import Image from '../../atoms/Image'
import theme from '../../../theme'
import Typography from '../../atoms/Typography'

export interface IconPlusTypoProps {
  iconSrc: string
  labelText: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  iconAlt?: string
}

const IconPlusTypo = (props: IconPlusTypoProps) => {
  const { iconSrc, labelText, onClick, iconAlt } = props

  const boxStyles: SxProps<Theme> = {
    width: '11vw',
    height: '6.67vw',
    backgroundColor: theme.palette.primary[100],
    padding: ' 1.39vw 2.78vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: ' center',
    flexDirection: 'column',
    gap: theme.spacing(2),
    border: `1px solid ${theme.palette.gray[100]}`,
    borderRadius: '0.83vw',
  }

  const typographyStyles: React.CSSProperties = {
    color: theme.palette.text.medemp,
  }

  const iconStyles: React.CSSProperties = {
    height: '1.39vw',
    width: '1.39vw',
  }

  return (
    <>
      <Box sx={boxStyles} data-testid={'Auth0'} onClick={onClick}>
        <Image src={iconSrc} alt={iconAlt} sx={iconStyles}></Image>
        <Typography variant="b1" style={typographyStyles}>
          {labelText}
        </Typography>
      </Box>
    </>
  )
}

export default IconPlusTypo
