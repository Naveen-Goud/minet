import { format } from 'date-fns'
import theme from '../../../theme'

export const getIndicatorColor = (isUp: boolean) =>
  isUp ? theme.palette.semantic.success[500] : theme.palette.semantic.error[500]

export const getRelevantIcon = (isUp: boolean) =>
  `assets/icons/${isUp ? 'arrow-up-green.svg' : 'arrow-down-red.svg'}`

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString)
  return format(date, 'LLL dd')
}
