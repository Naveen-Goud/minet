import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { DashboardFooter } from '../../components/organisms/DashboardFooter'
import DashboardHeader from '../../components/organisms/DashboardHeader'
import NavBar from '../../components/organisms/NavBar'
import LandingTemplate from '../../components/templates/LandingTemplate'
import theme from '../../theme'
import {
  UpperHeader,
  DetailsGraph,
  CorrelationCard,
  WalletHistory,
} from './helperComponents'
import { useLocation, useNavigate } from 'react-router'

const ContentBox = () => {
  const [overview, setOverview] = useState(true)
  const [wallet, setWallet] = useState(false)
  const [walletData, setWalletData] = useState<any>([])

  return (
    <Stack
      gap={'4vh'}
      bgcolor={theme.palette.primary[100]}
      sx={{
        padding: 6,
        height: '100vh',
      }}
    >
      <UpperHeader
        overview={overview}
        setOverview={setOverview}
        wallet={wallet}
        setWallet={setWallet}
        walletData={walletData}
        setWalletData={setWalletData}
      />
      {overview && (
        <Stack gap={'4vh'} bgcolor={theme.palette.primary[100]}>
          <DetailsGraph />
          <CorrelationCard />
        </Stack>
      )}
      {wallet && <WalletHistory coin={walletData} />}
    </Stack>
  )
}

const DetailsPage = () => {
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const coinId = queryParams.get('coinId')

  return (
    <>
      <LandingTemplate
        sidebar={<NavBar isActive={isActive} setIsActive={setIsActive} />}
        header={
          <DashboardHeader
            headerContent={'Trade'}
            sellEnabled={true}
            buyEnabled={true}
            handleBuyClick={() => {
              navigate(`/purchase?coinId=${coinId}`)
            }}
            handleSellClick={() => {
              navigate(`/sell?coinId=${coinId}`)
            }}
          />
        }
        content={<ContentBox />}
        footer={<DashboardFooter />}
      />
    </>
  )
}
export default DetailsPage
