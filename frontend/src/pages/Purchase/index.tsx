import { Box } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import TypographyComponent from '../../components/atoms/Typography'
import { AmountDetails } from '../../components/organisms/AmountDetails'
import ChooseCrypto from '../../components/organisms/ChooseCrypto'
import { DashboardFooter } from '../../components/organisms/DashboardFooter'
import DashboardHeader from '../../components/organisms/DashboardHeader'
import DepositTo from '../../components/molecules/DepositTo'
import NavBar from '../../components/organisms/NavBar'
import { OrderSummary } from '../../components/organisms/OrderSummary'
import PaymentSuccess from '../../components/organisms/PaymentSuccess'
import LandingTemplate from '../../components/templates/LandingTemplate'
import theme from '../../theme'
import { OrderAction, apiBase } from '../../utils/constants'
import DeliveryFee from '../../components/molecules/DeliveryFee'
import { useLocation, useNavigate } from 'react-router'
import numbro from 'numbro'
interface Crypto {
  id: any
  acronym: any
  name: any
  price: any
  iconUrl: any
}

const PurchasePage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const coinId = queryParams.get('coinId')

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
  console.log(coinId)
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

  const PaymentMethodCaptions = [
    {
      label1: 'PaymentMethod',
      label2: 'Visa credit ...8845',
      icon: '../assets/icons/Group 43.svg',
    },
    {
      label1: 'Delivery fees',
      label2: `0.001 ${selectItem.acronym}`,
      icon: '../assets/icons/Group 43.svg',
    },
    {
      label1: 'Deposit to',
      label2: `${selectItem.name} wallet`,
      icon: '../assets/icons/Group 43.svg',
    },
  ]
  const [captions, setCaptions] = useState(PaymentMethodCaptions)
  useEffect(() => {
    const updatedCaptions = [...PaymentMethodCaptions]
    setCaptions(updatedCaptions)
  }, [selectItem])
  const [isActive, setIsActive] = useState(false)

  const [parentSliderValue, setParentSliderValue] = useState('')
  const [currentValue, setCurrentValue] = useState(0)

  const handleParentSliderChange = (newValue: any) => {
    setParentSliderValue(newValue)
  }
  const [showPayment, setShowPayment] = useState(false)

  const handleClick = async () => {
    try {
      await axios.post(`${apiBase}/transactions`, {
        user_id: 1,
        action: 'purchase',
        coinId: selectItem.id,
        coinValue: parentSliderValue,
        amount: currentValue,
        time: 'Thu Jul 20 2023 11:13:41 GMT+0530 (India Standard Time)',
        status: 'pending',
        fromUser: 'Jane Smith',
        toUser: 'John Smith',
      })
      setShowPayment(true)
    } catch (error) {
      alert('Error during transaction')
    }
  }

  const navigate = useNavigate()
  return (
    <>
      <LandingTemplate
        sidebar={<NavBar isActive={isActive} setIsActive={setIsActive} />}
        header={
          showPayment ? (
            <DashboardHeader
              headerContent={'Checkout'}
              sellEnabled={false}
              buyEnabled={false}
            />
          ) : (
            <DashboardHeader
              headerContent={'Checkout'}
              sellEnabled={false}
              buyEnabled={false}
              sellHidden
              buyHidden
            />
          )
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
                totalAmount={parentSliderValue}
                transactionType={'Purchase'}
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
                  children={'Buy Crypto'}
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
                    type={'Payment method'}
                    iconSrc={'../assets/icons/rupee.svg'}
                    iconTitle={'USD Coin(Cash)'}
                    remainingBalance={`$34,000`}
                  />
                </Box>
                <Box mb={'16px'}>
                  <AmountDetails
                    action={'purchase'}
                    amount={34000}
                    currency={`${selectItem.acronym}`}
                    cryptoValue={selectItem.price}
                    setPurchaseValue={handleParentSliderChange}
                    setCurrentValue={setCurrentValue}
                  />
                </Box>
                <Box mb={'16px'}>
                  <DeliveryFee />
                </Box>
              </Box>
              <OrderSummary
                type={OrderAction}
                currency={`${parentSliderValue} ${selectItem.acronym}`}
                currencyCode={`1${selectItem.acronym} `}
                currencyValue={` $${numbro(selectItem.price).format({
                  thousandSeparated: true,
                })}`}
                captions={captions}
                convertedValue={`$${currentValue}`}
                handleTransaction={handleClick}
              />
            </Box>
          )
        }
      />
    </>
  )
}
export default PurchasePage
