import axios from 'axios'
import { BackendUrl, months } from '../../utils/constants'
import { OutputDataItem, convertData } from '../TradePage/utils'
import theme from '../../theme';
import numbro from 'numbro';

const colors=[
  'rgba(247, 147, 26, 0.20)',
  'rgba(34, 34, 34, 0.20)',
  'rgba(230, 0, 122, 0.20)',
  'rgba(98, 126, 234, 0.20)',
  'rgba(38, 161, 123, 0.20)',
  'rgba(25, 25, 113, 0.20)',
  'rgba(219, 201, 132, 0.20)'
]


export const fetchWatchlistData = async (
  userId: number,
  setCoinsData: { (value: any): void; (arg0: OutputDataItem[]): void },
  setLoadDashboard: { (value: boolean): void; (arg0: boolean): void }
) => {
  await axios.get(BackendUrl + 'coins').then(async (response) => {
    await convertData(response.data, userId).then((data) => {
      setCoinsData(data)
      setLoadDashboard(false)
    })
  })
}
export const getPriceHistory = async (id: any) => {
  const response = await axios.get(BackendUrl + 'price', {
    params: {
      coinId: id,
    },
  })
  const priceHistory = response.data[0].priceHistory.map(
    (item: { date: any; price: string }) => {
      return {
        x: item.date,
        y: parseInt(item.price),
      }
    }
  )
  return priceHistory
}

export const mapWatchlistData = async (coinsData: any[]) => {
  const rows = coinsData.filter(
    (item: { favorite: boolean }) => item.favorite === true
  )

  const watchlistRows = await Promise.all(
    rows.map(
      async (row: {
        id: any
        Name: { imageSrc: any; name: any; currency: any }
        Price: any
      }) => {
        const priceHistory = await getPriceHistory(row.id)
        const priceVals = calculatePercentage(
          priceHistory[0].y,
          priceHistory[1].y
        )
        return {
          id: row.id,
          src: row.Name.imageSrc,
          title: row.Name.name,
          cost: numbro(row.Price).format({thousandSeparated:true}),
          time: '24h',
          data: [
            {
              id: row.Name.currency,
              color: '#0324fc',
              data: priceHistory,
            },
          ],
          profitloss: (priceVals[1] ? '+' : '-') + priceVals[0] + '%',
        }
      }
    )
  )
  return watchlistRows
}

export const getInvestingHistory = async (id: any) => {
  const response = await axios.get(BackendUrl + 'investments', {
    params: {
      userId: id,
    },
  })
  const investmentHistory = response.data[0].investmentHistory.map(
    (investment: { date: any; investedAmount: string }) => {
      return {
        x: investment.date,
        y: parseInt(investment.investedAmount),
      }
    }
  )
  return investmentHistory
}

export const mapSelectData = async (coinsData: any[]) => {
  const selectData = await Promise.all(
    coinsData.map(async (coin: { id: any; Name: { name: any } }) => {
      return {
        id: coin.id,
        label: coin.Name.name,
        color: colors[coin.id % 6],
      }
    })
  )

  return selectData
}

const calculatePercentage = (prevVal: number, newVal: number) => {
  const percentage = Math.abs(prevVal - newVal) / prevVal
  const flag = prevVal <= newVal
  return [(percentage * 100).toFixed(2), flag]
}

export const mapPortfolioData = async (coinsData: any[], userId: number) => {
  const investmentHistory = await getInvestingHistory(userId)

  const portfolioData = await Promise.all(
    coinsData.map(
      async (coin: { id: any; Name: { name: any }; Price: any }) => {
        const priceHistory = await getPriceHistory(coin.id)
        const investmentVals = calculatePercentage(
          investmentHistory[0].y,
          investmentHistory[1].y
        )
        const priceVals = calculatePercentage(
          priceHistory[0].y,
          priceHistory[1].y
        )
        return {
          coinType: coin.Name.name,
          coinPercentageChange: priceVals[0],
          coinValue: coin.Price,
          graphData: [
            {
              id: coin.Name.name,
              color: colors[coin.id % 6],
              data: priceHistory,
            },
            {
              id: 'Total Investment',
              color:  theme.palette.primary[500],
              data: investmentHistory,
            },
          ],
          investmentPercentageChange: investmentVals[0],
          isCoinUp: priceVals[1],
          isInvestmentUp: investmentVals[1],
          totalInvestmentValue: '$' + investmentHistory[0].y,
        }
      }
    )
  )

  return portfolioData
}

export const setCurrencyType = async (coinId: any, coinData: any[]) => {
  const coin = await coinData.find((coin: { id: any }) => coinId === coin.id)
  if (coin) return [coin.Name.name, coin.Name.currency]
  return ['', '']
}
const setCurrencyValue = async (
  coinId: any,
  coinData: any[],
  balance: number
) => {
  const coin = await coinData.find((coin: { id: any }) => coinId === coin.id)
  return balance * parseFloat(coin.Price.replace(/[$,]/g, ''))
}

export const fetchPortfolioData = async (
  userId: number,
  coinData: Array<object>
) => {
  const response = await axios.get(BackendUrl + 'portfolio', {
    params: {
      userId: userId,
    },
  })

  const portfolioData = await Promise.all(
    response.data.map(
      async (item: { coinId: any; balance: any; iconUrl: any }) => {
        const currencyType = await setCurrencyType(item.coinId, coinData)
        const currencyValue = await setCurrencyValue(
          item.coinId,
          coinData,
          item.balance
        )
        return {
          id: item.coinId,
          iconSrc: item.iconUrl,
          currencyType: currencyType[0],
          currencyValue: currencyValue,
          currencyAcronym: currencyType[1],
          profitLoss: '+ 2.1%',
          isProfit: true,
        }
      }
    )
  )
  return portfolioData
}

 

const setStatus = (status: string) => {
  if (status.length > 0) return '../assets/icons/success.svg'
}

export const fetchWalletData = async (
  userId: number,
  coinData: Array<object>
) => {
  const response = await axios.get(BackendUrl + 'transactions', {
    params: {
      userId: userId,
    },
  })
  const wallet = await axios.get(BackendUrl + 'wallet', {
    params: {
      userId: userId,
    },
  })

  const transactions = await Promise.all(
    response.data.map(
      async (item: {
        time: string | number | Date
        coinId: any
        status: any
        id: any
        action: string
        coinValue: string | number
        amount: any
      }) => {
        const date = new Date(item.time)
        const currency: any = await setCurrencyType(item.coinId, coinData)
        const status = setStatus(item.status)

        return {
          id: item.id,
          month: months[date.getMonth()],
          day: date.getDate(),
          currencyName: currency[0],
          imgSource: status,
          from: 'JaneCooper',
          status: item.status,
          currencyValue:
            (item.action === 'sell' ? '-' : '+') + item.coinValue + currency[1],
          convertedAmount: item.amount,
        }
      }
    )
  )

  const walletData = {
    iconSrc: '../assets/icons/usddollar.svg',
    iconTitle: wallet.data[0].currencyName,
    iconAcronym: wallet.data[0].acronym,
    totalBalance: wallet.data[0].balance,
    data: transactions,
  }
  return walletData
}
