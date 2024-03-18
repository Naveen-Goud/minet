import { Stack } from '@mui/material'
import React from 'react'
import TypographyComponent from '../../atoms/Typography'
import theme from '../../../theme'
import { CustomChip } from '../../atoms/Chip'
import Image from '../../atoms/Image'
interface TransactionCardProps {
  month?: string
  day?: number
  status: string
  currencyName?: string
  from?: string
  currencyValue?: string
  convertedAmount?: string
  imgSource?: string
}
export const TransactionCard = (props: TransactionCardProps) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      data-testid="transaction-card"
    >
      <Stack direction={'row'} gap={theme.spacing(2)}>
        <Stack direction={'row'} gap={theme.spacing(2)}>
          <Stack direction={'column'} width={'24px'}>
            <TypographyComponent
              variant={'c2'}
              style={{ color: theme.palette.text.medemp }}
            >
              {props.month}
            </TypographyComponent>

            <TypographyComponent
              variant={'subtitle2'}
              style={{ color: theme.palette.text.highemp }}
            >
              {props.day}
            </TypographyComponent>
          </Stack>

          <Image
            width="44px"
            height="44px"
            src={props.imgSource}
            alt="Transaction status Image"
          />
        </Stack>
        <Stack direction={'column'}>
          <TypographyComponent
            variant={'b1'}
            style={{ color: theme.palette.text.highemp }}
          >
            {props.currencyName}
          </TypographyComponent>
          <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(2)}>
            <TypographyComponent
              variant={'c2'}
              style={{ color: theme.palette.text.medemp }}
            >
              from {props.from}
            </TypographyComponent>
            <CustomChip
              label={props.status}
              variant={'filled'}
              sx={{ backgroundColor: theme.palette.gray[50] }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={'column'}
        alignItems={'flex-end'}
        alignSelf={'flex-end'}
      >
        <TypographyComponent
          variant={'b1'}
          style={{ color: theme.palette.text.highemp }}
        >
          {props.currencyValue}
        </TypographyComponent>
        <TypographyComponent
          variant={'c2'}
          style={{ color: theme.palette.text.medemp }}
        >
          {props.convertedAmount}
        </TypographyComponent>
      </Stack>
    </Stack>
  )
}
