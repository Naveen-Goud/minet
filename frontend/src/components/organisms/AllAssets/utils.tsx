import { GridColDef } from '@mui/x-data-grid'
import {
  NameComponent,
  ChangeComponent,
  WatchComponent,
} from '../TradeCard/components'
import Image from '../../atoms/Image'
const CustomHeader = (params: any) => {
  const { colDef } = params
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {colDef.headerName}
      <Image src={'../assets/icons/market_cap.svg'} />
    </div>
  )
}

export const nameSortComparator = (v1: any, v2: any) => {
  const nameA = v1.name.toLowerCase()
  const nameB = v2.name.toLowerCase()

  if (nameA < nameB) {
    return -1
  } else if (nameA > nameB) {
    return 1
  } else {
    return nameA.length - nameB.length
  }
}

export const priceAndChangeSortComparator = (v1: any, v2: any) => {
  const a = Number(v1.replace(/[^0-9.-]+/g, ''))
  const b = Number(v2.replace(/[^0-9.-]+/g, ''))

  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0
  }
}

export const marketCapSortComparator = (v1: any, v2: any) => {
  function marketCapToNumber(str: string) {
    const suffixes = {
      K: 1e3,
      M: 1e6,
      B: 1e9,
      T: 1e12,
    }

    const value = Number(str.replace(/[^0-9.-]+/g, ''))
    const suffix = str.charAt(str.length - 1)

    return value * suffixes[suffix]
  }

  const marketCapA = marketCapToNumber(v1)
  const marketCapB = marketCapToNumber(v2)

  if (marketCapA < marketCapB) {
    return -1
  } else if (marketCapA > marketCapB) {
    return 1
  } else {
    return 0
  }
}

export const columns: GridColDef[] = [
  {
    field: 'Name',
    headerName: 'Name',
    renderCell: (params) => {
      const { name, currency, imageSrc } = params.value
      return (
        <NameComponent name={name} currency={currency} imageSrc={imageSrc} />
      )
    },
    flex: 1,
    sortComparator: nameSortComparator,
  },
  {
    field: 'Price',
    headerName: 'Price',
    flex: 1,
    sortComparator: priceAndChangeSortComparator,
  },
  {
    field: 'Change',
    headerName: 'Change',
    renderCell: (params) => {
      const number = params.row.Change
      return <ChangeComponent number={number} />
    },
    flex: 1,
    sortComparator: priceAndChangeSortComparator,
  },
  {
    field: 'MarketCap',
    headerName: 'Market Cap',
    flex: 1,
    renderHeader: CustomHeader,
    sortComparator: marketCapSortComparator,
  },
  {
    field: 'Watch',
    headerName: 'Watch',
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <WatchComponent
          row={params.row}
          favorite={params.row.favorite}
          id={params.row.id}
        />
      )
    },
  },
]

export const setAssetRows = (allAssetRows: any[]) => {
  const wlstrows = allAssetRows.filter((item: { favorite: boolean }) => {
    return item.favorite === true
  })
  return wlstrows
}

export const switchAssets = (
  e: any,
  title: string,
  setAllAssets: any,
  setWatchlist: any
) => {
  if (title === 'All Assets') {
    setAllAssets(true)
    setWatchlist(false)
  } else if (title === 'Watchlist') {
    setWatchlist(true)
    setAllAssets(false)
  }
}

export const handleSearch = (
  e,
  rows,
  allAssets,
  watchlist,
  allAssetRows,
  setRows,
  setInputValue
) => {
  setInputValue(e.target.value)

  const searchValue = e.target.value.toLowerCase()

  if (allAssets) {
    if (searchValue === '') {
      setRows[0](rows)
    } else {
      const filteredRows = rows.filter((row) =>
        row.Name.name.toLowerCase().includes(searchValue)
      )
      setRows[0](filteredRows)
    }
  } else if (watchlist) {
    if (searchValue === '') {
      setRows[1](setAssetRows(allAssetRows))
    } else {
      const wtclstrows = setAssetRows(allAssetRows)
      const filteredRows = wtclstrows.filter((row) =>
        row.Name.name.toLowerCase().includes(searchValue)
      )
      setRows[1](filteredRows)
    }
  }
}
