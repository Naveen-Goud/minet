import React, { useContext, useEffect, useState } from 'react'
import LandingTemplate from '../../components/templates/LandingTemplate'
import NavBar from '../../components/organisms/NavBar'
import DashboardHeader from '../../components/organisms/DashboardHeader'
import { DashboardFooter } from '../../components/organisms/DashboardFooter'
import WatchList from '../../components/organisms/WatchList'
import { Box, Grid, Stack } from '@mui/material'
import {
  fetchPortfolioData,
  fetchWalletData,
  fetchWatchlistData,
  mapPortfolioData,
  mapSelectData,
  mapWatchlistData,
} from './utils'
import {
  CoinsContext,
  DashboardLoader,
  UserContext,
  WatchlistContext,
} from '../../App'
import TypographyComponent from '../../components/atoms/Typography'
import theme from '../../theme'
import Image from '../../components/atoms/Image'
import PortfolioValue from '../../components/organisms/PortfolioValue'
import {
  DashboardConstants,
  DashboardPageConstant,
} from '../../utils/constants'
import CurrencySelection from '../../components/organisms/CurrencySelection'
import Portfolio from '../../components/organisms/MyPortfolio'
import MyWallet from '../../components/organisms/MyWallet'
import { useNavigate } from 'react-router'
import numbro from 'numbro'

const DashboardViewlist = () => {
  const navigate = useNavigate()
  const { userId } = useContext(UserContext)
  const { coinsData, setCoinsData }: any = useContext(CoinsContext)
  const { loadDashboard, setLoadDashboard } = useContext(DashboardLoader)
  const { watchlistData, setWatchlistData } = useContext(WatchlistContext)
  const fetchDashboardData = async () => {
    if (loadDashboard) {
      await fetchWatchlistData(userId, setCoinsData, setLoadDashboard)
    } else {
      const mappedData = await mapWatchlistData(coinsData)
      setWatchlistData(mappedData)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [loadDashboard])
  return (
    <Stack direction={'column'}>
      <Stack
        direction={'row'}
        alignSelf={'stretch'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={'1vh 1.5vw'}
      >
        <Stack direction={'row'} spacing={'2vw'} alignItems={'center'}>
          <TypographyComponent
            variant={'subtitle1'}
            style={{ color: theme.palette.text.highemp }}
          >
            {DashboardConstants[0]}
          </TypographyComponent>
          <Stack
            data-testid={'discover-assets'}
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              const boolValue1 = true
              const boolValue2 = false
              navigate(`/trade?allAssets=${boolValue1}&watchlist=${boolValue2}`)
            }}
            direction={'row'}
            alignItems={'center'}
            gap={'0.5vw'}
          >
            <TypographyComponent
              variant={'c1'}
              style={{ color: theme.palette.primary[500] }}
            >
              {DashboardConstants[1]}
            </TypographyComponent>
            <Image src="../assets/icons/chervonright.svg" />
          </Stack>
        </Stack>
        <Stack direction={'row'} gap={'2vw'} alignItems={'center'}>
          <Stack
            data-testid="watchlist-items"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              const boolValue1 = false
              const boolValue2 = true
              navigate(`/trade?allAssets=${boolValue1}&watchlist=${boolValue2}`)
            }}
            direction={'row'}
            gap={'0.5vw'}
            alignItems={'center'}
          >
            <TypographyComponent
              variant={'c1'}
              style={{
                color: theme.palette.primary[500],
                textAlign: 'center',
              }}
            >
              {DashboardConstants[2]}
            </TypographyComponent>
            <Image src="../assets/icons/editblue.svg" />
          </Stack>

          <Stack direction={'row'} gap={'0.5vw'} alignItems={'center'}>
            <Image src="../assets/icons/grid.svg" />
            <Image src="../assets/icons/PortfolioVector.svg" />
          </Stack>
        </Stack>
      </Stack>

      <Box p={'1.5vh 1.5vw'} maxHeight={'40vh'} overflow={'auto'}>
        <Grid container spacing={'4vh'}>
          {watchlistData.length > 0 &&
            watchlistData.map((watchlist: any) => (
              <Grid
                item
                xs={12}
                sm={watchlistData.length > 1 ? 6 : 12}
                md={watchlistData.length > 1 ? 6 : 12}
                lg={watchlistData.length > 1 ? 6 : 12}
                key={watchlist.title}
              >
                <WatchList
                  graphWidth={watchlistData.length <= 1 ? 46 : 16}
                  src={watchlist.src}
                  title={watchlist.title}
                  cost={watchlist.cost}
                  time={watchlist.time}
                  data={watchlist.data}
                  showYGridLines={false}
                  showXAxis={false}
                  profitloss={watchlist.profitloss}
                  gridYValues={[2000, 2500, 3000, 3500, 4000]}
                  showLegends={true}
                  margins={{ top: 20, right: 20, bottom: 60, left: 80 }}
                  legendProps={{
                    translateX: 0,
                    translateY: -10,
                    itemHeight: 14,
                    itemWidth: 100,
                    itemSpacing: 2,
                    symbolSize: 8,
                    itemTextColor: '#000',
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Stack>
  )
}

const ViewPortfolioValue = ({ portfolio, setPortfolio }) => {
  const { coinsData } = useContext(CoinsContext)
  const { userId } = useContext(UserContext)
  const [currencySelectData, setCurrencySelectData] = useState<any>([])
  const [portfolioData, setPortfolioData] = useState<any>([])
  const fetchData = async () => {
    if (coinsData.length) {
      const data = await mapPortfolioData(coinsData, userId)
      setPortfolioData(data)
      const selectData = await mapSelectData(coinsData)
      setCurrencySelectData(selectData)
    }
  }

  useEffect(() => {
    fetchData()
  }, [coinsData])
  return (
    <Stack gap={'2vh'} marginX={'1.5vw'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <TypographyComponent
          variant={'subtitle1'}
          style={{ color: theme.palette.text.highemp }}
        >
          {DashboardConstants[3]}
        </TypographyComponent>
        <Stack direction={'row'}>
          <Box height={'2.7vh'}>
            <Stack direction={'row'} spacing={theme.spacing(2)}>
              <Image src="../assets/icons/Vector.svg" />
              <Image src="../assets/icons/graph.svg" />
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Box
        bgcolor={theme.palette.gray.white}
        border={'1px solid ' + theme.palette.gray[100]}
        borderRadius={'4px'}
      >
        {coinsData.length > 0 && portfolioData.length > 0 && (
          <PortfolioValue
            coinType={portfolioData[portfolio].coinType}
            coinPercentageChange={portfolioData[portfolio].coinPercentageChange}
            coinValue={
              '$' +
              numbro(portfolioData[portfolio].coinValue).format({
                thousandSeparated: true,
              })
            }
            graphData={portfolioData[portfolio].graphData}
            investmentPercentageChange={
              portfolioData[portfolio].investmentPercentageChange
            }
            isCoinUp={portfolioData[portfolio].isCoinUp}
            isInvestmentUp={portfolioData[portfolio].isInvestmentUp}
            totalInvestmentValue={
              '$' +
              numbro(portfolioData[portfolio].totalInvestmentValue).format({
                thousandSeparated: true,
              })
            }
          />
        )}
        {!coinsData.length && <PortfolioValue />}
      </Box>
      <Box height={'2.7vh'} padding={theme.spacing(2)}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <TypographyComponent variant={'button'}>
            {DashboardPageConstant[1]}
          </TypographyComponent>
          <Stack justifyContent={'center'} direction={'row'}>
            <Box width={'1.5vw'} height={'1.7vh'}>
              <Image src="../assets/icons/info.svg" />
            </Box>
            <TypographyComponent
              variant={'c2'}
              style={{
                color: theme.palette.text.highemp,
                padding: theme.spacing(1),
              }}
            >
              {DashboardPageConstant[2]}
            </TypographyComponent>
          </Stack>
        </Stack>
      </Box>
      <Stack direction={'row'} gap={'1vw'} alignItems="center">
        <Image src="../assets/icons/chervonrightgrey.svg" />
        {currencySelectData.length && (
          <CurrencySelection
            getSelectedIdOnClick={(i) => {
              setPortfolio(i - 1)
            }}
            currencyList={currencySelectData}
          />
        )}
        <Image src="../assets/icons/chervonleftgrey.svg" />
      </Stack>
    </Stack>
  )
}

const ViewWallet = () => {
  const { userId } = useContext(UserContext)
  const { coinsData }: any = useContext(CoinsContext)
  const [walletData, setWalletData] = useState<any>([])
  useEffect(() => {
    const fetchWallet = async () => {
      if (coinsData.length) {
        const wallet = await fetchWalletData(userId, coinsData)
        setWalletData(wallet)
      }
    }

    fetchWallet()
  }, [coinsData])
  return (
    <Box px={'1vw'} overflow={'scroll'}>
      {walletData && (
        <MyWallet
          iconSrc={walletData.iconSrc}
          iconTitle={walletData.iconTitle}
          iconAcronym={walletData.iconAcronym}
          data={walletData.data}
          totalBalance={parseFloat(walletData.totalBalance)}
        />
      )}
    </Box>
  )
}

export const ViewMyPortfolio = () => {
  const { userId } = useContext(UserContext)
  const { coinsData } = useContext(CoinsContext)
  const [portfolioData, setPortfolioData] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      if (coinsData.length) {
        const data = await fetchPortfolioData(userId, coinsData)
        setPortfolioData(data)
      }
    }

    fetchData()
  }, [coinsData])
  return (
    <Stack gap={'2vh'} bgcolor={theme.palette.gray.white}>
      {portfolioData.length > 0 && <Portfolio data={portfolioData} />}
      <ViewWallet />
    </Stack>
  )
}

const DashboardPage = () => {
  const [isActive, setIsActive] = useState(true)
  const [portfolio, setPortfolio] = useState<number>(0)
  useEffect(() => {}, [])
  return (
    <LandingTemplate
      sidebar={<NavBar isActive={isActive} setIsActive={setIsActive} />}
      header={
        <Box>
          <DashboardHeader
            headerContent={'Dashboard'}
            sellEnabled={false}
            buyEnabled={false}
          />
        </Box>
      }
      footer={<DashboardFooter />}
      content={
        <Box display={'flex'}>
          <Stack p={'1.5vh 1vw'} width={'61.5vw'} gap={'2vh'}>
            <DashboardViewlist />
            <ViewPortfolioValue
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          </Stack>
          <Box marginY={'2.5vh'}>
            <ViewMyPortfolio />
          </Box>
        </Box>
      }
    />
  )
}

export default DashboardPage
