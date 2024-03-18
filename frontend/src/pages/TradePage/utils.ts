import axios from 'axios'
import { apiBase } from '../../utils/constants'
import numbro from 'numbro'

let globalUserId = 0

export interface InputDataItem {
  id: number
  acronym: string
  name: string
  iconUrl: string
  currentPrice: number
  marketCap: number
  circulatingSupply: number
  volume: number
}

export interface NameDetails {
  name: string
  currency: string
  imageSrc: string
}

export interface OutputDataItem {
  id: number
  Name: NameDetails
  Price: string
  MarketCap: string
  favorite: boolean
  Change: number
  volume: number
}

export interface PriceData {
  date: string
  price: number
}

export interface WatchlistData {
  id: number
  coinId: number
  userId: number
}

export const convertData = async (
  inputData: InputDataItem[],
  userId: number
): Promise<OutputDataItem[]> => {
  globalUserId = userId
  const watchlistData: WatchlistData[] = await getWatchlist(userId)
  const watchlistCoinIds = new Set()
  watchlistData.forEach((item) => watchlistCoinIds.add(item.coinId))

  const outputData: OutputDataItem[] = []

  for (const item of inputData) {
    const outputItem: OutputDataItem = {
      id: item.id,
      Name: {
        name: item.name,
        currency: item.acronym,
        imageSrc: item.iconUrl,
      },
      Price: `$${numbro(item.currentPrice.toFixed(2)).format({thousandSeparated:true})}`,
      MarketCap:
        '$' + numbro(item.marketCap).format({ average: true }).toUpperCase(),
      Change: (await calculateChange(item.id)).toFixed(1),
      favorite: watchlistCoinIds.has(item.id),
      volume: item.volume,
    }

    outputData.push(outputItem)
  }

  return outputData
}

export const deleteFromWatchlist = async (watchlistId: number) => {
  await axios.delete(`${apiBase}/watchlists/${watchlistId}`)
}

export const getWatchlist = async (userId: number) => {
  try {
    const response = await axios.get(`${apiBase}/watchlists`, {
      params: {
        userId: userId,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getPriceData = async (coinId: number) => {
  try {
    const response = await axios.get(`${apiBase}/price`, {
      params: {
        coinId: coinId,
      },
    })
    console.log(response.data)
    return response.data[0].priceHistory
  } catch (error) {
    console.error(error)
  }
}

export const calculateChange = async (coinId: number) => {
  const priceHistory = await getPriceData(coinId)
  const sortedPriceHistory = priceHistory.sort(
    (a: PriceData, b: PriceData) => new Date(b.date) - new Date(a.date)
  )
  return (sortedPriceHistory[0].price - sortedPriceHistory[1].price) / 100
}

export const handleWatchlistUpdate = async (coinId: number) => {
  const watchlistData: WatchlistData[] = await getWatchlist(globalUserId)
  const existingData = watchlistData.find(
    (item) => item.userId === globalUserId && item.coinId === coinId
  )
  if (existingData) {
    await axios.delete(`${apiBase}/watchlists/${existingData.id}`)
  } else {
    await axios.post(`${apiBase}/watchlists`, {
      userId: globalUserId,
      coinId: coinId,
    })
  }
}
