import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import Image from '../../atoms/Image'
import theme from '../../../theme'
import Typography from '../../atoms/Typography'

export interface PortfolioCardProps {
  iconSrc: string
  currencyType: string
  currencyValue: string
  profitLoss: string
  currencyAcronym: string
  isProfit: boolean
  isDetailsPage?:boolean
}

const PortfolioCard = (props: PortfolioCardProps) => {
  const {
    iconSrc,
    currencyType,
    currencyValue,
    currencyAcronym,
    isProfit,
    profitLoss,
    isDetailsPage=false,
  } = props

  const containerStyles: SxProps<Theme> = {
    width: '25.7vw',
    display: 'flex',
    flexDirection: 'row',
    padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(
      2
    )} ${theme.spacing(4)}`,
    justifyContent: 'space-between',
  }

  const iconBoxStyles: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.69vw',
  }

  const currencyBoxStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    alignItems: 'flex-start',
  }

  const iconStyles: React.CSSProperties = {
    width: '42px',
    height: '42px',
  }

  const currencyTypeTypographyStyles: React.CSSProperties = {
    color: `${theme.palette.text.highemp}`,
  }

  const currencyAcronymTypographyStyles: React.CSSProperties = {
    color: theme.palette.text.medemp,
  }

  const numericBoxStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    alignItems: 'flex-end',
    textAlign: 'end',
  }

  const currencyValueTypographyStyles: React.CSSProperties = {
    color: theme.palette.text.highemp,
  }

  const profitLossTypographyStyles: React.CSSProperties = {
    color: `
    ${isProfit
        ? theme.palette.semantic.success[500]
        : theme.palette.semantic.error[500]
    }`,
  }

  return (
    <>
      <Box sx={containerStyles}>
        <Box sx={iconBoxStyles}>
          <Image src={iconSrc} sx={iconStyles} alt={currencyAcronym}></Image>
          <Box sx={currencyBoxStyles}>
            <Typography variant="b1" style={currencyTypeTypographyStyles}>
              {currencyType}
            </Typography>
            <Typography variant="c2" style={currencyAcronymTypographyStyles}>
              {currencyAcronym}
            </Typography>
          </Box>
        </Box>
        <Box sx={numericBoxStyles}>
          <Typography variant="b1" style={currencyValueTypographyStyles}>
            {currencyValue}
          </Typography>
          <Typography variant="c2" style={profitLossTypographyStyles}>
            {profitLoss}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default PortfolioCard
