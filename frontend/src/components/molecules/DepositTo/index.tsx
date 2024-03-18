import React from 'react'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import Image from '../../atoms/Image'
import { Box, Stack, Typography, styled } from '@mui/material'

interface DepositToProps {
  type: string
  iconSrc?: string
  iconTitle?: string
  remainingBalance?: string
  onClick?: () => void
  details?: string
}

const OuterBox = styled(Stack)`
  width: 49.3vw;
  padding: 2vw;
  border: 1px solid ${theme.palette.gray[100]};
  gap: 16px;
  border-radius: 4px;
  background-color: ${theme.palette.gray.white};
`

const Container = styled(Box)`
  border-radius: 4px;
  border: 1px solid ${theme.palette.gray[100]};
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.palette.gray.white};
`

const IconBox = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 0.69vw;
  align-items: center;
`

const CurrencyBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  align-items: flex-start;
`

const Icon = styled(Image)`
  width: 2.92vw;
  height: 2.92vw;
`

const CurrencyTitle = styled(Typography)`
  color: ${theme.palette.text.highemp};
  justifycontent: center;
`

const CurrencyTotalBalance = styled(Typography)`
  color: ${theme.palette.text.medemp};
`

const NumericBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  align-items: flex-end;
  text-align: end;
  justify-content: center;
`

const CurrencyMethod = styled(Typography)`
  color: ${theme.palette.text.medemp};
`

const DepositTo = (props: DepositToProps) => {
  return (
    <OuterBox onClick={props.onClick}>
      <Stack justifyContent="flex-start" color={theme.palette.text.highemp}>
        <TypographyComponent variant="b1">{props.type}</TypographyComponent>
      </Stack>
      <Container>
        <IconBox>
          <Icon src={props.iconSrc} />
          <CurrencyBox>
            <CurrencyTitle variant="b1">{props.iconTitle}</CurrencyTitle>
            {props.type === 'Payment method' && (
              <CurrencyTotalBalance variant="subtitle1">
                Total Balance - {props.remainingBalance}
              </CurrencyTotalBalance>
            )}
          </CurrencyBox>
        </IconBox>
        <NumericBox>
          <CurrencyMethod variant="b1">{props.details ? props.details : "Default"}</CurrencyMethod>
        </NumericBox>
      </Container>
    </OuterBox>
  )
}

export default DepositTo
