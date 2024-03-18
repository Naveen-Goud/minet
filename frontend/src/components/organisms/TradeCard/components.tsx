import TypographyComponent from '../../atoms/Typography'
import theme from '../../../theme'
import { Box } from '@mui/material'
import Image from '../../atoms/Image'
import { useContext, useState } from 'react'
import { handleWatchlistUpdate } from '../../../pages/TradePage/utils'
import { DashboardLoader, TradePageLoader } from '../../../App'
interface WatchProps {
  id: number
  row: any
  favorite?: boolean
}
interface NameProps {
  name: string
  currency: string
  imageSrc: string
}
interface ChangeProps {
  number: number
}
const star = '../assets/icons/star.svg'
const bluestar = '../assets/icons/starclicked.svg'

export const ChangeComponent = ({ number }: ChangeProps) => {
  return (
    <TypographyComponent
      variant={'b2'}
      style={{
        color:
          number > 0
            ? theme.palette.semantic.success[500]
            : theme.palette.semantic.error[500],
      }}
    >
      {number}%
    </TypographyComponent>
  )
}

export const NameComponent = (props: NameProps) => {
  return (
    <Box display={'flex'} alignItems="center">
      <Image src={props.imageSrc} />
      <Box
        display="flex"
        flexDirection={'column'}
        sx={{ marginLeft: 5 }}
        width={50}
      >
        <TypographyComponent variant={'c1'}>{props.name}</TypographyComponent>
        <TypographyComponent
          variant={'c1'}
          style={{ color: theme.palette.text.lowemp }}
        >
          {props.currency}
        </TypographyComponent>
      </Box>
    </Box>
  )
}

export const WatchComponent = (props: WatchProps) => {
  const { setLoadDashboard } = useContext(DashboardLoader)
  const { loadPage, setLoadPage } = useContext(TradePageLoader)
  const [watched, setWatched] = useState(props.favorite)
  const handleClick = async (e) => {
    e.stopPropagation()
    await handleWatchlistUpdate(props.id)
    setWatched(!watched)
    setLoadPage(!loadPage)
    setLoadDashboard(true)
  }
  return (
    <Box maxWidth={'15vw'}>
      <Image
        src={watched ? bluestar : star}
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
      />
    </Box>
  )
}
