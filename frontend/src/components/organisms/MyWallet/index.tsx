import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import Image from '../../atoms/Image'
import { emptyTransactionMsg } from '../../../utils/constants'
import CustomChip from '../../atoms/Chip'
import numbro from 'numbro'

interface MyWalletProps {
  iconSrc?: string
  iconTitle?: string
  iconAcronym?: string
  totalBalance: number
  data?: Array<{
    id?: number
    month?: string
    day?: number
    status: string
    currencyName?: string
    from?: string
    currencyValue?: string
    convertedAmount?: string
    imgSource?: string
  }>
}

const OuterBox = styled(Box)(() => ({
  height: '40.10vh',
  width: '27vw',
  backgroundColor: theme.palette.gray.white,
  gap: '24px',
}))

const InnerBox = styled(Box)(() => ({
  height: '12.7vh',
  width: '27vw',
  padding: '3px',
}))

const IconHeader = styled(Stack)(() => ({
  height: '5.4vh',
  width: '8.7vw',
  alignItems: 'center',
}))

const WalletImage = styled(Image)(() => ({
  height: '5.4vh',
  width: '2.9vw',
  padding: '4px',
}))

const WalletBox = styled(Box)(() => ({
  display: 'flex',
  gap: '0.69vw',
  height: '7.5vh',
  width: '26.3vw',
  position: 'sticky',
}))

const WalletNumericBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  alignItems: 'flex-end',
  textAlign: 'end',
}))

const IconAcronym = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.medemp,
  justifyContent: 'center',
}))

const WalletCurrencyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.highemp,
}))

const WalletDefault = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.highemp,
}))

const CurrencyBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  alignItems: 'flex-start',
}))

const HeaderStyle = styled(Stack)(({ theme }) => ({
  height: '3.6vh',
  color: theme.palette.text.highemp,
}))

const TransactionBox = styled(Box)(() => ({
  height: '24.8vh',
  width: '26.6vw',
}))

const TransactionButton = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary[500],
}))

const TransactionHeader = styled(Stack)(() => ({
  justifyContent: 'space-between',
}))

const EmptyTransactionBox = styled(Box)(() => ({
  width: '26vw',
  height: '13.6vh',
  gap: '2px',
}))

const EmptyMessage = styled(Box)(({ theme }) => ({
  color: theme.palette.text.medemp,
  paddingLeft: '28px',
  height: '4.1vh',
  width: '24.3vw',
}))

const ImageBox = styled(Box)(() => ({
  paddingTop: '48px',
  paddingLeft: '118px',
  height: '7.9vh',
  width: '11.2vw',
}))

const MyWallet: React.FC<MyWalletProps> = (props) => {
  const { data } = props
  const [showTransactions, setShowTransactions] = useState(true)
  const [transactions, setTransactions] = useState<
    Array<{
      id?: number
      month?: string
      day?: number
      status: string
      currencyName?: string
      from?: string
      currencyValue?: string
      convertedAmount?: string
      imgSource?: string
    }>
  >([])

  const handleViewAllClick = () => {
    setShowTransactions(false)
  }

  useEffect(() => {
    if (Array.isArray(data)) {
      setTransactions(data)
    }
  }, [data])

  return (
    <>
      <OuterBox>
        <InnerBox>
          <HeaderStyle>
            <TypographyComponent
              variant={'subtitle1'}
              children={'My Wallet'}
              style={{ color: theme.palette.text.highemp, lineHeight: '22px' }}
            ></TypographyComponent>
          </HeaderStyle>
          <WalletBox
            justifyContent={'space-between'}
            paddingTop={'16px'}
            alignItems={'center'}
          >
            <IconHeader direction={'row'} gap={'0.5vw'}>
              <WalletImage src={props.iconSrc} />
              <CurrencyBox flexDirection={'column'}>
                <WalletCurrencyTitle variant="b1">
                  {props.iconTitle}
                </WalletCurrencyTitle>
                <IconAcronym variant="c2">{props.iconAcronym}</IconAcronym>
              </CurrencyBox>
            </IconHeader>
            <WalletNumericBox justifyContent={'center'}>
              <WalletDefault variant="b1">
                ${' '}
                {numbro(props.totalBalance).format({
                  thousandSeparated: true,
                })}
              </WalletDefault>
            </WalletNumericBox>
          </WalletBox>
        </InnerBox>
        <TransactionBox>
          <TransactionHeader
            justifyContent={'space-between'}
            direction={'row'}
            alignItems={'center'}
          >
            <TypographyComponent
              variant={'subtitle1'}
              children={'Recent Transactions'}
            />
            <Box
              onClick={handleViewAllClick}
              alignItems={'center'}
              sx={{ cursor: 'pointer' }}
            >
              <TransactionButton
                variant={'button'}
                children={'view all'}
                color="primary"
              />
            </Box>
          </TransactionHeader>
          {showTransactions ? (
            <EmptyTransactionBox>
              <ImageBox>
                <Image src="../assets/icons/image_empty_transactions.svg" />
              </ImageBox>
              <EmptyMessage>
                <TypographyComponent
                  variant={'c2'}
                  children={emptyTransactionMsg}
                />
              </EmptyMessage>
            </EmptyTransactionBox>
          ) : (
            <EmptyTransactionBox>
              {transactions.map((transaction, id) => (
                <Box
                  height={'9vh'}
                  padding={'8px'}
                  key={transaction.id}
                  alignItems={'center'}
                >
                  <Stack
                    key={transaction.id}
                    direction={'row'}
                    alignItems={'center'}
                    width={'26.6vw'}
                  >
                    <Stack
                      direction={'column'}
                      gap={theme.spacing(2)}
                      width={'26.6vw'}
                    >
                      <Stack direction={'row'} gap={theme.spacing(2)}>
                        <TypographyComponent
                          variant={'c2'}
                          style={{ color: theme.palette.text.medemp }}
                        >
                          {transaction.month}
                        </TypographyComponent>
                        <TypographyComponent
                          variant={'c2'}
                          style={{ color: theme.palette.text.medemp }}
                        >
                          {transaction.day}
                        </TypographyComponent>
                      </Stack>
                      <Stack direction={'row'} gap={theme.spacing(2)}>
                        <Stack gap={theme.spacing(2)}>
                          <Image
                            src={transaction.imgSource}
                            alt="Transaction status Image"
                          />
                        </Stack>
                        <Stack
                          width={'23.5vw'}
                          direction={'row'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                        >
                          <Stack direction={'column'} gap={'0.5vh'}>
                            <TypographyComponent
                              variant={'b1'}
                              style={{ color: theme.palette.text.highemp }}
                            >
                              {transaction.currencyName}
                            </TypographyComponent>
                            <CustomChip
                              label={transaction.status}
                              variant={'filled'}
                              sx={{
                                backgroundColor: theme.palette.gray[50],
                                height: '20px',
                              }}
                            />
                          </Stack>
                          <Stack direction={'column'} textAlign={'right'}>
                            <TypographyComponent
                              variant={'b1'}
                              style={{
                                color: theme.palette.text.highemp,
                                textAlign: 'left',
                              }}
                            >
                              {transaction.currencyValue}
                            </TypographyComponent>
                            <TypographyComponent
                              variant={'c2'}
                              style={{ color: theme.palette.text.medemp }}
                            >
                              {numbro(transaction.convertedAmount).format({
                                thousandSeparated: true,
                              })}
                            </TypographyComponent>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </EmptyTransactionBox>
          )}
        </TransactionBox>
      </OuterBox>
    </>
  )
}

export default MyWallet
