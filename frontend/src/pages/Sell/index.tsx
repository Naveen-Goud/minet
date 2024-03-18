import LandingTemplate from '../../components/templates/LandingTemplate'
import DashboardHeader from '../../components/organisms/DashboardHeader'
import { DashboardFooter } from '../../components/organisms/DashboardFooter'
import ChooseCrypto from '../../components/organisms/ChooseCrypto'
import NavBar from '../../components/organisms/NavBar'
import { AmountDetails } from '../../components/organisms/AmountDetails'
import { Box } from '@mui/material'
import theme from '../../theme'
import TypographyComponent from '../../components/atoms/Typography'
import { OrderSummary } from '../../components/organisms/OrderSummary'
import {
  SellAction,
  PaymentMethodCaptionsSell,
  apiBase,
} from '../../utils/constants'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PaymentSuccess from '../../components/organisms/PaymentSuccess'
import { useLocation, useNavigate } from 'react-router-dom'
import DepositTo from '../../components/molecules/DepositTo'
import numbro from 'numbro'
interface Crypto {
  id: any
  acronym: any
  name: any
  price: any
  iconUrl: any
}

const SellPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const coinId = queryParams.get('coinId')

  const navigate = useNavigate()
  const [cryptos, setCryptos] = useState([])
  const [selectItem, setSelectItem] = useState<Crypto>({
    id: 0,
    acronym: '',
    name: '',
    price: 0,
    iconUrl: '',
  })
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://bc98ms.bootcamp64.tk/coins')
      const modifiedData = response.data.map((crypto: any) => {
        const { id, acronym, name, currentPrice, iconUrl } = crypto
        const price = currentPrice
        if (id === parseInt(coinId)) {
          setSelectItem({ id, acronym, name, price, iconUrl })
        }
        return { id, acronym, name, price, iconUrl }
      })
      setCryptos(modifiedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  PaymentMethodCaptionsSell[0].label2 = `${selectItem.name} wallet`
  PaymentMethodCaptionsSell[1].label2 = `0.001 ${selectItem.acronym}`

  const [captions, setCaptions] = useState(PaymentMethodCaptionsSell)
  useEffect(() => {
    const updatedCaptions = [...PaymentMethodCaptionsSell]
    setCaptions(updatedCaptions)
  }, [selectItem])
  const [isActive, setIsActive] = useState(false)

  const [parentSliderValue, setParentSliderValue] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)

  const handleParentSliderChange = (newValue: any) => {
    setParentSliderValue(newValue)
  }
  const [showPayment, setShowPayment] = useState(false)
  const handleClick = async () => {
    try {
      await axios.post(`${apiBase}/transactions`, {
        user_id: 12345,
        action: 'sell',
        coinId: selectItem.id,
        coinValue: currentValue,
        amount: parentSliderValue,
        time: 'Thu Jul 20 2023 11:13:41 GMT+0530 (India Standard Time)',
        status: 'failed',
        fromUser: 'Jane Smith',
        toUser: 'John Smith',
      })
      setShowPayment(true)
    } catch (error) {
      alert('Error during transaction')
    }
  }
  return (
    <>
      <LandingTemplate
        sidebar={<NavBar isActive={isActive} setIsActive={setIsActive} />}
        header={
          <DashboardHeader
            headerContent={'Checkout'}
            sellEnabled={false}
            buyEnabled={false}
          />
        }
        footer={<DashboardFooter />}
        content={
          showPayment ? (
            <Box
              display="flex"
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.primary[100],
              }}
              justifyContent="center"
              alignItems="center"
            >
              <PaymentSuccess
                totalAmount={`${currentValue}`}
                transactionType={'Sell'}
                crypto={selectItem.acronym}
                handleCoinClick={() => navigate('/walletCash')}
              />
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ backgroundColor: theme.palette.primary[100] }}
            >
              <Box sx={{ padding: '20px' }}>
                <TypographyComponent
                  variant={'subtitle1'}
                  children={'Sell Crypto'}
                  style={{
                    color: theme.palette.text.highemp,
                    marginBottom: '8px',
                  }}
                />
                <Box mb={'16px'}>
                  <ChooseCrypto
                    items={cryptos}
                    setSelectItem={setSelectItem}
                    selectedCoin={parseInt(coinId)}
                  />
                </Box>
                <Box mb={'16px'}>
                  <DepositTo
                    type={'Total balance'}
                    iconSrc={selectItem.iconUrl}
                    iconTitle={selectItem.name}
                    details={`${currentValue} ${selectItem.acronym}`}
                  />
                </Box>
                <Box mb={'16px'}>
                  <AmountDetails
                    action={'sell'}
                    currencyValue={1}
                    currency={`${selectItem.acronym}`}
                    cryptoValue={selectItem.price}
                    setPurchaseValue={handleParentSliderChange}
                    setCurrentValue={setCurrentValue}
                  />
                </Box>
                <Box mb={'16px'}>
                  <DepositTo
                    type={'Deposit to'}
                    iconSrc={'../assets/icons/rupee.svg'}
                    iconTitle="USD Coin (Cash)"
                  />
                </Box>
              </Box>
              <OrderSummary
                type={SellAction}
                currency={`${currentValue} ${selectItem.acronym}`}
                currencyCode={`1${selectItem.acronym} `}
                currencyValue={`$${numbro(selectItem.price).format({
                  thousandSeparated: true,
                })}`}
                captions={captions}
                convertedValue={`$${parentSliderValue}`}
                handleTransaction={handleClick}
              />
            </Box>
          )
        }
      />
    </>
  )
}
export default SellPage
