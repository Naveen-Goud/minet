import React from 'react'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import DeliveryDropDown from '../DeliveryDropDown'
import { Box, Stack, styled } from '@mui/material'

const Container = styled(Box)`
  border-radius: 4px;
  padding: 16px;
  display: flex;
  radius: 4px;
  background-color: ${theme.palette.gray.white};
`

const DeliveryFeeOuterBox = styled(Box)`
  padding: 24px;
  border: 1px solid ${theme.palette.gray[100]};
  gap: 16px;
  border-radius: 4px;
  background-color: ${theme.palette.gray.white};
`

const DeliveryFee = () => {
  return (
    <DeliveryFeeOuterBox data-testid="delivery-dropDown">
      <Stack justifyContent="flex-start" px={'1vw'}>
        <TypographyComponent
          variant="b1"
          style={{ color: theme.palette.text.highemp }}
        >
          Select speed delivery
        </TypographyComponent>
      </Stack>
      <Container>
        <DeliveryDropDown width="46.0vw" />
      </Container>
    </DeliveryFeeOuterBox>
  )
}

export default DeliveryFee
