import { Box, Divider, Stack, SxProps, Theme } from '@mui/material'
import React from 'react'
import TypographyComponent from '../../atoms/Typography'
import theme from '../../../theme'
import CustomButton from '../../atoms/Button'
import {
  OrderSummaryButton,
  SellSummaryButton,
  OrderAction,
} from '../../../utils/constants'
import styled from '@emotion/styled'
import { CustomStepper } from '../../molecules/Stepper'
import numbro from 'numbro'

interface OrderSummaryProps {
  type?: string
  currency?: string
  currencyValue?: string
  currencyCode?: string
  convertedValue: string
  captions?: any
  handleTransaction?: any
}

const StyledCard = styled(Box)`
  width: 36.6vw;
  border: 1px solid ${theme.palette.gray[100]};
  height: 73vh;
  background-color: ${theme.palette.gray.white};
`
const HeadingStackStyles: SxProps<Theme> = {
  p: '1.5vw',
  gap: '1vh',
  alignItems: 'center',
}
const HeadingTextStyles: React.CSSProperties = {
  color: theme.palette.text.medemp,
}
const DividerStyles: SxProps<Theme> = {
  borderColor: theme.palette.gray[100],
}

const middleStackStyles: SxProps<Theme> = {
  height: '23vh',
  marginY: '2vh',
  marginX: '1.5vw',
  gap: '0.5vw',
  alignItems: 'center',
}

const BottomStackStyles: SxProps<Theme> = {
  px: '1.5vw',
  py: '2vh',
  gap: '3vh',
}
const BottomStackObjectStyles: SxProps<Theme> = {
  gap: '0.5vw',
  alignItems: 'center',
}
const BottomTextStyles: React.CSSProperties = {
  textTransform: 'none',
  color: theme.palette.text.highemp,
}

const DottedDividerStyles: SxProps<Theme> = {
  marginY: '0.8vh',
  flexGrow: 1,
  alignSelf: 'stretch',
  alignItems: 'center',
  borderStyle: 'dotted',
  borderBottomWidth: 2,
  borderColor: theme.palette.grey[300],
}

const ButtonStackStyles: SxProps<Theme> = {
  py: '2vh',
  px: '1.5vw',
}

const addTotal = (value1: string, value2: string) => {
  const num1 = Number(value1.replace(/[^0-9.-]+/g, ''))
  const num2 = Number(value2.replace(/[^0-9.-]+/g, ''))

  const sum = num1 + num2

  return numbro(sum).format({ thousandSeparated: true })
}

export const OrderSummary = (props: OrderSummaryProps) => {
  const total = addTotal(props.convertedValue, '$1000')
  const dividerObject = [
    { left: props.currency, right: props.convertedValue, variant: 'overline' },
    { left: 'transaction fee', right: '$1,000.00', variant: 'overline' },
    { left: 'Total', right: `$${total}`, variant: 'b1' },
  ]

  return (
    <StyledCard>
      <Stack direction={'column'} sx={HeadingStackStyles}>
        <TypographyComponent variant={'c1'} style={HeadingTextStyles}>
          {props.type}
        </TypographyComponent>
        <TypographyComponent variant={'h6'} style={HeadingTextStyles}>
          {props.currency}
        </TypographyComponent>
        <TypographyComponent variant={'c1'} style={HeadingTextStyles}>
          {props.currencyCode}={props.currencyValue}
        </TypographyComponent>
      </Stack>
      <Divider sx={DividerStyles} />
      <Stack direction={'row'} sx={middleStackStyles}>
        <CustomStepper steps={props.captions} activeStep={1} />
      </Stack>
      <Divider sx={DividerStyles} />
      <Stack direction={'column'} sx={BottomStackStyles}>
        {dividerObject.map((item) => (
          <Stack key={item.left} direction="row" sx={BottomStackObjectStyles}>
            <TypographyComponent
              variant={item.left === 'Total' ? 'b1' : 'overline'}
              style={BottomTextStyles}
            >
              {item.left}
            </TypographyComponent>
            <Divider sx={DottedDividerStyles} />
            <TypographyComponent
              variant={item.left === 'Total' ? 'b1' : 'overline'}
              style={BottomTextStyles}
            >
              {item.right}
            </TypographyComponent>
          </Stack>
        ))}
      </Stack>
      <Stack sx={ButtonStackStyles}>
        <CustomButton
          variant={'contained'}
          onClick={props.handleTransaction}
          color={props.type == OrderAction ? 'primary' : 'warning'}
          children={
            props.type == OrderAction ? OrderSummaryButton : SellSummaryButton
          }
        />
      </Stack>
    </StyledCard>
  )
}
