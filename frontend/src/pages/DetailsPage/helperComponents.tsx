import React, { useState, useEffect } from 'react'
import { Stack, styled } from '@mui/system'
import { Box } from '@mui/material'
import theme from '../../theme'
import axios from 'axios'
import Graph from '../../components/atoms/Graph'
import TypographyComponent from '../../components/atoms/Typography'
import PortfolioCard from '../../components/molecules/PortfolioCard'
import TimePeriodTabs from '../../components/molecules/TimePeriod'
import { customTick } from '../../components/organisms/PortfolioValue'
import WalletWatchlist from '../../components/organisms/WalletWatchlist'
import {
  DetailsPageConstant,
  BackendUrl,
  DetailsTitle,
} from '../../utils/constants'
import Image from '../../components/atoms/Image'
import WalletTable from '../../components/organisms/WalletTable'
import { useLocation } from 'react-router'
import { getPriceHistory } from '../Dashboard/utils'
import numbro from 'numbro'

const ScrollbarBox = styled(Box)`
  max-height: 25vh;
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
const setStyle = (item: string, flag: boolean) => {
  if ((item === 'Overview' || item === 'Wallet') && flag) {
    return TitleActiveStyle
  } else {
    return TitleInactiveStyle
  }
}
const TitleInactiveStyle: React.CSSProperties = {
  color: theme.palette.text.highemp,
  paddingInline: '2vw',
  paddingBlock: theme.spacing(2),
  cursor: 'pointer',
}
const TitleActiveStyle: React.CSSProperties = {
  color: theme.palette.primary[500],
  paddingBlock: theme.spacing(2),
  paddingInline: '2vw',
  cursor: 'pointer',
  borderBottom: '2px solid ' + theme.palette.primary[500],
}

export const CorrelationCard = () => {
  const watchlistData = [
    {
      id: 1,
      iconSrc: '../assets/icons/bitcoin.svg',
      currencyType: 'Bitcoin',
      currencyValue: '$ 2,300,000.00',
      profitLoss: '100%',
      currencyAcronym: '',
    },
    {
      id: 2,
      iconSrc: '../assets/icons/etherium.svg',
      currencyType: 'Etherium',
      currencyValue: '$ 1,500,000.00',
      profitLoss: '80%',
      currencyAcronym: '',
    },
  ]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWatchlistData()
  }, [])

  const fetchWatchlistData = async () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box height={'20vh'} paddingLeft={'4px'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack spacing={theme.spacing(4)}>
          <Stack
            sx={{
              width: '46.6vw',
              height: '12.5vh',
              spacing: theme.spacing(12),
            }}
            gap={'1vh'}
          >
            <TypographyComponent variant={'b1'} children={'About Bitcoin'} />
            <TypographyComponent
              variant={'b2'}
              children={DetailsPageConstant[0]}
            />
          </Stack>
          <Stack direction={'column'}>
            <Stack
              gap={'1vh'}
              sx={{ width: '10.8vw', height: '12.5vh', direction: 'column' }}
            >
              <TypographyComponent variant={'b1'} children={'Resources'} />
              <Box
                padding={'2px'}
                justifyContent={'center'}
                textAlign={'center'}
              >
                <Stack
                  direction={'row'}
                  spacing={theme.spacing(2)}
                  alignItems={'center'}
                >
                  <Image src="../assets/icons/website.svg" />
                  <TypographyComponent
                    variant={'b2'}
                    children={DetailsPageConstant[1]}
                    style={{ color: theme.palette.primary[500] }}
                  />
                </Stack>
                <Stack
                  direction={'row'}
                  spacing={theme.spacing(3)}
                  alignItems={'center'}
                >
                  <Image src="../assets/icons/paperwork.svg" />
                  <TypographyComponent
                    variant={'b2'}
                    children={DetailsPageConstant[2]}
                    style={{ color: theme.palette.primary[500] }}
                  />
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Box
          width={'28vw'}
          py={'1.5vh'}
          borderRadius={'4px'}
          height={'28vh'}
          border={'1px solid' + theme.palette.gray[100]}
          bgcolor={theme.palette.gray.white}
          overflow={'scroll'}
        >
          <TypographyComponent
            variant={'subtitle1'}
            style={{ color: theme.palette.text.highemp, paddingInline: '1vw' }}
            children={'Price corelation with'}
          />
          <ScrollbarBox>
            {watchlistData.map((item) => (
              <Box sx={{ height: '7vh' }} key={item.id}>
                <PortfolioCard
                  iconSrc={item.iconSrc}
                  currencyType={item.currencyType}
                  currencyValue={item.currencyValue}
                  profitLoss={item.profitLoss}
                  currencyAcronym={'Moves tightly together'}
                  isProfit={false}
                  isDetailsPage={true}
                />
              </Box>
            ))}
          </ScrollbarBox>
        </Box>
      </Stack>
    </Box>
  )
}

const formatNumber = (value: number): string => {
  const symbols = ['', 'K', 'M', 'B', 'T']
  const tier = (Math.log10(Math.abs(value)) / 3) | 0
  const suffix = symbols[tier]
  return (value / Math.pow(10, tier * 3)).toFixed(2) + suffix
}

export const DetailsGraph = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const coinId = queryParams.get('coinId')
  const [priceHistory, setPriceHistory] = useState([])
  const fetchGraphData = async () => {
    const price = await getPriceHistory(coinId)
    setPriceHistory(price)
    console.log({
      id: parseInt(coinId),
      color: '#0324fc',
      data: priceHistory,
    })
  }

  useEffect(() => {
    fetchGraphData()
  }, [])
  return (
    <Box
      p={'1.5vw'}
      bgcolor={theme.palette.gray.white}
      height={'35.5vh'}
      gap={'32px'}
      border={`1px solid ${theme.palette.gray[100]}`}
    >
      <Stack direction={'column'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          spacing={theme.spacing(4)}
        >
          <Box height={'8px'} width={'186px'}>
            <Stack direction={'column'} spacing={theme.spacing(1)}>
              <TypographyComponent
                variant={'c1'}
                style={{ color: theme.palette.text.medemp }}
                children={'Current Value'}
              />
              <TypographyComponent
                variant={'b1'}
                children={'$3,285,53.73'}
                style={{ color: theme.palette.text.highemp }}
              />
              <Stack direction={'row'} alignItems={'center'}>
                <Image src="../assets/icons/p&l.svg" />
                <TypographyComponent
                  variant={'c2'}
                  children={'+2.5%'}
                  style={{ color: theme.palette.semantic.success[500] }}
                />
              </Stack>
            </Stack>
          </Box>
          <Stack
            height={'4.58vw'}
            alignItems={'flex-end'}
            gap={theme.spacing(6)}
            width={'28.47vw'}
            direction={'column'}
          >
            <TimePeriodTabs
              clicked={true}
              rounded={true}
              data-testid="time-period-tabs"
            ></TimePeriodTabs>
            <Stack alignItems={'flex-start'} gap={theme.spacing(6)}>
              <Stack alignItems={'center'} gap={theme.spacing(1)}></Stack>
            </Stack>
          </Stack>
        </Stack>
        <Box height={'25.9vh'} width={'87.9vw'} data-testid="graph">
          {priceHistory.length > 0 && (
            <Graph
              data-testid="graph"
              customTick={customTick}
              data={[
                {
                  id: parseInt(coinId),
                  color: '#B71A33',
                  data: priceHistory,
                },
              ]}
              showYGridLines={true}
              showXAxis={true}
              showLegends={true}
              margins={{
                top: 0,
                right: 0,
                bottom: 30,
                left: 0,
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export const UpperHeader = ({
  overview,
  setOverview,
  wallet,
  setWallet,
  walletData,
  setWalletData,
}) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const coinId = queryParams.get('coinId')

  const fetchWalletData = async () => {
    await axios.get(BackendUrl + 'coins/' + coinId).then((response) => {
      setWalletData(response.data)
    })
  }
  const titles = [overview, wallet]
  useEffect(() => {
    fetchWalletData()
  }, [])

  return (
    <Box>
      <Stack direction={'column'} spacing={theme.spacing(7)}>
        <Box height={'9vh'} width={'89vw'}>
          <WalletWatchlist
            key={walletData.id}
            imageSrc={walletData.iconUrl}
            name={walletData.name}
            currency={walletData.acronym}
            marketCap={formatNumber(walletData.marketCap)}
            volume={formatNumber(walletData.volume)}
            circulatingSupply={formatNumber(walletData.circulatingSupply)}
            number={1}
          />
        </Box>
        <Box
          bgcolor={theme.palette.primary[100]}
          height={'3vh'}
          justifyContent={'center'}
          sx={{
            paddingY: 6,
          }}
        >
          <Stack
            direction={'row'}
            borderBottom={`1px solid ${theme.palette.gray[100]}`}
          >
            {DetailsTitle.map((item, index) => (
              <Box
                data-testid={item}
                key={item}
                onClick={() => {
                  if (item === 'Overview') {
                    setWallet(false)
                    setOverview(true)
                  } else {
                    setOverview(false)
                    setWallet(true)
                  }
                }}
              >
                <TypographyComponent
                  variant="subtitle2"
                  style={setStyle(item, titles[index])}
                >
                  {item}
                </TypographyComponent>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export const WalletHistory = ({ coin }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const coinId = queryParams.get('coinId')
  const coinName = queryParams.get('coinName')
  const [portfolio, setPortfolio] = useState<any>([])
  const [transactions, setTransactions] = useState<any>([])

  const fetchPortfolio = async () => {
    await axios
      .get(BackendUrl + 'portfolio', {
        params: {
          userId: 1,
          coinId: coinId,
        },
      })
      .then((response) => {
        setPortfolio(response.data[0])
      })
  }

  const fetchTransactions = async () => {
    await axios
      .get(BackendUrl + 'transactions', {
        params: {
          user_id: 1,
          coinId: coinId,
        },
      })
      .then((response) => {
        response.data.map((item: any) => {
          const currencyAmount = '$ ' + item.amount
          const currencyValue =
            (item.action === 'sell' ? '-' : '+') + item.coinValue + ' BTC'
          const dateString = item.time
          const properDateFormat = new Date(dateString)

          setTransactions((prevTransactions: any) => [
            ...prevTransactions,
            {
              id: item.id,
              status: item.action,
              transactionState: item.status,
              from: item.fromUser,
              date: properDateFormat,
              currencyName: item.name,
              convertedAmount: currencyAmount,
              currencyValue: currencyValue,
            },
          ])
        })
      })
  }
  useEffect(() => {
    fetchPortfolio()
    fetchTransactions()
  }, [])
  return (
    <Stack gap={'1vh'}>
      <Stack
        direction={'row'}
        gap={'1vw'}
        borderRadius={'4px'}
        padding={'2vh 1.5vw'}
        bgcolor={theme.palette.gray[50]}
      >
        <TypographyComponent
          variant="subtitle1"
          style={{ color: theme.palette.text.highemp }}
        >
          Total balance
        </TypographyComponent>
        <TypographyComponent
          variant="subtitle1"
          style={{ color: theme.palette.text.highemp }}
        >
          {portfolio ? portfolio.balance : 0} {coinName} ($
          {numbro(85000.55).format({ thousandSeparated: true })})
        </TypographyComponent>
      </Stack>
      <WalletTable data={transactions} />
    </Stack>
  )
}
