import { Action, Cash, Max } from '../../../utils/constants'

export const getSliderValue = (
  action: 'purchase' | 'sell',
  currencyValue: any,
  cryptoValue: any,
  amount: any
) => {
  if (action === 'sell') {
    const sliderValue = parseFloat((10 / cryptoValue).toFixed(5))
    const maxValue = parseFloat(currencyValue.toFixed(5))
    return [maxValue, sliderValue, sliderValue]
  } else {
    const sliderValue = parseFloat((10).toFixed(2))
    return [amount, sliderValue, sliderValue]
  }
}

export const formatCurrencyValue = (
  action: 'purchase' | 'sell',
  sliderValue: any,
  cryptoValue: any,
  setValue?: any
) => {
  if (action === 'sell') {
    if (setValue) setValue((sliderValue * cryptoValue).toFixed(2))
    return `$${(sliderValue * cryptoValue).toFixed(2)}`
  }
  else {
    if (setValue) setValue((sliderValue / cryptoValue).toFixed(5))
    return (sliderValue / cryptoValue).toFixed(5)
  }
}

export const formatCaption = (
  action: 'purchase' | 'sell',
  currency: string
) => {
  return action === Action.sell ? Cash : currency
}

export const formatButtonText = (action: 'purchase' | 'sell') => {
  return action === Action.sell ? Max[0] : Max[1]
}

export const formatAmountValue = (
  action: 'purchase' | 'sell',
  sliderValue: any,
  setCurrentValue?: any
) => {
  if (action === Action.sell) {
    if (setCurrentValue)
      setCurrentValue(sliderValue)
    return sliderValue
  }
  else {
    if (setCurrentValue) setCurrentValue(parseFloat(sliderValue.toFixed(2)))
    return `$${sliderValue.toFixed(2)}`
  }
}
