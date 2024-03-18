import React, { useEffect, useState } from 'react'
import LandingTemplate from '../../components/templates/LandingTemplate'
import NavBar from '../../components/organisms/NavBar'
import DashboardHeader from '../../components/organisms/DashboardHeader'
import { DashboardFooter } from '../../components/organisms/DashboardFooter'
import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import axios from 'axios'
import { BackendUrl } from '../../utils/constants'
import CashWatchlist from '../../components/organisms/CashWatchList'
import TypographyComponent from '../../components/atoms/Typography'
import theme from '../../theme'
import WalletTable from '../../components/organisms/WalletTable'
import numbro from 'numbro'

interface StyledStackProps {
  gap?: React.CSSProperties['gap']
  px?: React.CSSProperties['paddingLeft']
  py?: React.CSSProperties['paddingTop']
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
}
const StyledStack = styled(Stack)<StyledStackProps>`
  padding-left: ${({ px }) => px};
  padding-top: ${({ py }) => py};
  flex-direction: ${({ direction }) => direction};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
`
const WalletPageContent = () => {
  const [walletBalance, setWalletBalance] = useState(0)
  const [transactions, setTransactions] = useState<any>([])
  const fetchWallet = async () => {
    await axios
      .get(BackendUrl + 'wallet', {
        params: {
          userID: 1,
        },
      })
      .then((response) => {
        setWalletBalance(response.data[0].balance)
      })
  }
  const fetchTransactions = async () => {
    await axios
      .get(BackendUrl + 'transactions', {
        params: {
          userID: 1,
        },
      })
      .then((response) => {
        response.data.forEach((item: any) => {
          const dateString = item.time
          const properDateFormat = new Date(dateString)
          const currencyAmount =
            '$ ' + numbro(item.amount).format({ thousandSeparated: true })
          const currencyValue =
            (item.action === 'sell' ? '+' : '-') + item.coinValue + ' BTC'
          setTransactions((prevTransactions: any) => [
            ...prevTransactions,
            {
              id: item.id,
              status: item.action,
              transactionState: item.status,
              from: item.fromUser,
              date: properDateFormat,
              currencyName: 'Bitcoin',
              convertedAmount: currencyAmount,
              currencyValue: currencyValue,
            },
          ])
        })
      })
  }
  useEffect(() => {
    fetchWallet()
    fetchTransactions()
  }, [])

  return (
    <StyledStack
      direction={'column'}
      bgcolor={theme.palette.primary[100]}
      p={'1.5vh 1vw'}
      gap={'2vh'}
    >
      <CashWatchlist />
      <StyledStack gap={'1vh'}>
        <TypographyComponent
          variant={'subtitle2'}
          style={{ color: theme.palette.gray[500] }}
        >
          Wallet
        </TypographyComponent>
        <StyledStack
          p={'1vw'}
          bgcolor={theme.palette.gray[50]}
          direction={'row'}
          justifyContent={'space-between'}
          borderRadius={theme.spacing(1)}
        >
          <TypographyComponent
            variant={'subtitle1'}
            style={{ color: theme.palette.text.highemp }}
          >
            Total balance
          </TypographyComponent>
          <TypographyComponent
            variant={'subtitle1'}
            style={{ color: theme.palette.text.highemp }}
          >
            $ {numbro(walletBalance).format({ thousandSeparated: true })}
          </TypographyComponent>
        </StyledStack>
        <StyledStack bgcolor={theme.palette.gray.white}>
          <WalletTable data={transactions} />
        </StyledStack>
      </StyledStack>
    </StyledStack>
  )
}

const WalletCashPage = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <LandingTemplate
      sidebar={<NavBar isActive={isActive} setIsActive={setIsActive} />}
      header={
        <DashboardHeader
          headerContent={'Trade'}
          sellEnabled={false}
          buyEnabled={false}
        />
      }
      footer={<DashboardFooter />}
      content={<WalletPageContent />}
    />
  )
}

export default WalletCashPage
