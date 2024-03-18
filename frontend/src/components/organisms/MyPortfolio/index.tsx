import React, { useState, useEffect } from 'react'
import { Box, Stack, styled } from '@mui/material'
import TypographyComponent from '../../atoms/Typography'
import Image from '../../atoms/Image'
import PortfolioCard from '../../molecules/PortfolioCard'
import theme from '../../../theme'
import numbro from 'numbro'

interface PortfolioProps {
  data: Array<{
    id: string
    iconSrc: string
    currencyType: string
    currencyValue: number
    profitLoss: string
    currencyAcronym: string
    isProfit: boolean
  }>
}

const OuterBox = styled(Box)`
  height: 40.1vh;
  width: 27.63vw;
  background-color: ${theme.palette.gray.white};
`

const InnerBox = styled(Box)`
  height: 42.44vh;
  width: 27.63vw;
`

const HeaderStack = styled(Stack)`
  height: 4.1vh;
  width: 27.63vw;
`

const ScrollbarBox = styled(Box)`
  height: 23.6vh;
  width: 27.63vw;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.palette.gray.white};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.palette.gray[300]};
    border: 3px solid ${theme.palette.gray[300]};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.gray[300]};
  }

  &::-webkit-scrollbar-track:hover {
    background: ${theme.palette.gray[300]};
  }
`

const TotalBox = styled(Stack)`
  height: 9.11vh;
  // width: 25.6vw;
  justify-content: center;
  gap: 24px;
  padding-left: 24px;
`

const lineBreakerStyles = {
  background: theme.palette.grey[300],
  height: '2px',
  border: 'none',
  width: '100%',
  marginLeft: '1vw',
}

const Portfolio = (props: PortfolioProps) => {
  const { data } = props
  const [totalBalance, setTotalBalance] = useState(0)
  const [cryptoDetails, setCryptoDetails] = useState<
    Array<{
      id: string
      iconSrc: string
      currencyType: string
      currencyValue: number
      profitLoss: string
      currencyAcronym: string
      isProfit: boolean
    }>
  >([])

  useEffect(() => {
    if (Array.isArray(data)) {
      setCryptoDetails(data)
    }
  }, [data])

  useEffect(() => {
    const sum = data.reduce((total, item) => total + item.currencyValue, 0)
    setTotalBalance(sum)
  }, [data])

  return (
    <OuterBox>
      <InnerBox>
        <Stack
          paddingLeft={'1vw'}
          justifyContent="flex-end"
          alignItems="center"
          direction="row"
        >
          <HeaderStack>
            <TypographyComponent
              variant="subtitle1"
              children="My Portfolio"
              style={{ color: theme.palette.text.highemp }}
            />
          </HeaderStack>
          <Stack direction="row" spacing={4}>
            <Image src="../assets/icons/Vector.svg" />
            <Image src="../assets/icons/PortfolioVector.svg" />
          </Stack>
        </Stack>
        <ScrollbarBox>
          {cryptoDetails.map((crypto) => (
            <PortfolioCard
              key={crypto.id}
              iconSrc={crypto.iconSrc}
              currencyType={crypto.currencyType}
              currencyValue={numbro(crypto.currencyValue.toFixed(2)).format({
                thousandSeparated: true,
              })}
              profitLoss={crypto.profitLoss}
              currencyAcronym={crypto.currencyAcronym}
              isProfit={crypto.isProfit}
            />
          ))}
        </ScrollbarBox>

        <hr style={lineBreakerStyles} />
        <TotalBox>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
            paddingRight={'0.3vw'}
          >
            <TypographyComponent
              variant="b1"
              children="Total Balance"
              style={{ color: theme.palette.text.medemp }}
            />
            <TypographyComponent
              variant="b1"
              children={`$ ${numbro(totalBalance.toFixed(2)).format({
                thousandSeparated: true,
              })}`}
            />
          </Stack>
        </TotalBox>
        <hr style={lineBreakerStyles} />
      </InnerBox>
    </OuterBox>
  )
}

export default Portfolio
