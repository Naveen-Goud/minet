import React, { useState, useEffect } from 'react'
import { Stack, SxProps, Theme, styled } from '@mui/material'
import TypographyComponent from '../../atoms/Typography'
import {
  Action,
  AmountDetailsTitle,
  SliderMinValues,
} from '../../../utils/constants'
import theme from '../../../theme'
import CustomButton from '../../atoms/Button'
import SliderComponent from '../../atoms/Slider'
import {
  formatAmountValue,
  formatButtonText,
  formatCaption,
  formatCurrencyValue,
  getSliderValue,
} from './utils'

interface StyledStackProps {
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  gap?: React.CSSProperties['gap']
  px?: React.CSSProperties['paddingLeft']
  py?: React.CSSProperties['paddingTop']
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}

const StyledBox = styled(Stack)<StyledStackProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
  padding-left: ${({ px }) => px};
  padding-top: ${({ py }) => py};
  direction: ${({ direction }) => direction};
`

const MainStyledBoxStyle: SxProps<Theme> = {
  border: '1px solid ' + theme.palette.gray[100],
  height: '33vh',
  px: '2vw',
  py: '3vh',
  gap: '2vh',
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.gray.white
}
const AmountStyle: React.CSSProperties = {
  color: theme.palette.text.highemp,
}
const AmountCaptionStyle: React.CSSProperties = {
  color: theme.palette.text.medemp,
}

const AmountBoxStyle: SxProps<Theme> = {
  backgroundColor: theme.palette.gray.white,
  px: '1vw',
  py: '1.5vh',
  height: '5vh',
  alignItems: 'center',
  borderRadius: theme.spacing(1),
  justifyContent: 'space-between',
  border: '1px solid ' + theme.palette.gray[100],
}

const SliderBoxStyle: SxProps<Theme> = {
  px: '2vw',
  alignItems: 'center',
}
const CustomButtonStyle: React.CSSProperties = {
  height: '5vh',
  width: '6.25vw',
  textTransform: 'none',
  backgroundColor: theme.palette.gray.white,
}
interface AmountDetailsProps {
  action: 'purchase' | 'sell'
  amount?: any
  currencyValue?: any
  currency: string
  cryptoValue: any
  setPurchaseValue?:any
  setCurrentValue?:any
}

export const AmountDetails = (props: AmountDetailsProps) => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [slidervalue, setSlidervalue] = useState(0)

  let sliderValues = []
  useEffect(() => {
    sliderValues = getSliderValue(
      props.action,
      props.currencyValue,
      props.cryptoValue,
      props.amount
    )
    setMaxValue(sliderValues[0])
    setMinValue(sliderValues[1])
    setSlidervalue(sliderValues[2])
  }, [props.action, props.amount, props.currencyValue, props.cryptoValue])

  const sliderChange = (e: any, newvalue: number) => {
    setSlidervalue(newvalue)
  }

  const onMax = () => {
    setSlidervalue(maxValue)
  }

  return (
    <StyledBox direction="column" sx={MainStyledBoxStyle}>
      <TypographyComponent variant={'b1'}>
        {AmountDetailsTitle}
      </TypographyComponent>
      <StyledBox>
        <StyledBox direction="row" sx={AmountBoxStyle}>
          <TypographyComponent variant="subtitle1">
            {formatAmountValue(props.action, slidervalue, props?.setCurrentValue)}
          </TypographyComponent>
          <CustomButton
            variant={'outlined'}
            sx={CustomButtonStyle}
            onClick={onMax}
          >
            {formatButtonText(props.action)}
          </CustomButton>
        </StyledBox>
        <StyledBox sx={SliderBoxStyle} direction={'row'}>
          <SliderComponent
            value={slidervalue}
            step={
              props.action === Action.sell
                ? SliderMinValues[0]
                : SliderMinValues[1]
            }
            min={minValue}
            max={maxValue}
            handleChange={sliderChange}
          />
          <TypographyComponent variant="c1" style={AmountCaptionStyle}>
            {' '}
            1{props.currency} = ${props.cryptoValue}
          </TypographyComponent>
        </StyledBox>
        <StyledBox direction="row" sx={AmountBoxStyle}>
          <TypographyComponent variant="subtitle1" style={AmountStyle}>
            {formatCurrencyValue(props.action, slidervalue, props.cryptoValue, props?.setPurchaseValue)}
    
          </TypographyComponent>

          <TypographyComponent variant={'subtitle1'} style={AmountCaptionStyle}>
            {formatCaption(props.action, props.currency)}
          </TypographyComponent>
        </StyledBox>
      </StyledBox>
    </StyledBox>
  )
}
