import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import theme from '../../../theme'
import CustomCurrencyChip from '../../molecules/CustomCurrencyChip'

export interface CurrencySelectionProps {
  currencyList: Array<{ id: number; label: string; color: string }>
  getSelectedIdOnClick(id: number): void
}

const CurrencySelection = (props: CurrencySelectionProps) => {
  const { currencyList, getSelectedIdOnClick } = props

  const [data, setData] = useState(currencyList)

  const [currentSelectionId, setCurrentSelectionId] = useState<number>()

  useEffect(() => {
    setData(currencyList)
  }, [currencyList])

  return (
    <>
      <Stack
        width={'56.72vw'}
        height={'auto'}
        alignItems={'flex-start'}
        gap={theme.spacing(4)}
        direction={'row'}
      >
        {data.map((currency) => {
          return (
            <CustomCurrencyChip
              isActive={currentSelectionId == currency.id}
              key={currency.id}
              onClick={() => {
                setCurrentSelectionId(currency.id)
                getSelectedIdOnClick(currency.id)
              }}
              label={currency.label}
              color={currency.color}
            ></CustomCurrencyChip>
          )
        })}
      </Stack>
    </>
  )
}

export default CurrencySelection
