import { Box } from '@mui/material'
import TypographyComponent from '../../atoms/Typography'
import theme from '../../../theme'
import { TimePeriods } from '../../../utils/constants'
type TimePeriodProps = {
  clicked: boolean
  rounded?: boolean
}
const clickedstyle = {
  color: theme.palette.primary[500],
  borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.primary[500]}`,
}
const defaultstyle = {
  color: theme.palette.text.lowemp,
}
const clickedroundedstyle = {
  backgroundColor: theme.palette.primary[300],
  color: theme.palette.primary[900],
  borderRadius: '50px',
  padding: '8px',
}
function getStyle(rounded: any) {
  if (rounded === true) {
    return clickedroundedstyle
  }
  return clickedstyle
}
const TimePeriodTabs = (props: TimePeriodProps) => {
  return (
    <Box
      sx={{
        width: '27.06vw',
        height: '4.67vh',
        border: `${theme.spacing(0.5)} solid ${theme.palette.gray[50]}`,
        borderRadius: theme.spacing(0.75),
        color: theme.palette.text.lowemp,
        padding: '3px',
      }}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {TimePeriods.map((time, index) => (
        <TypographyComponent
          style={
            index == 3 && props.clicked ? getStyle(props.rounded) : defaultstyle
          }
          key={time}
          variant="b2"
          children={time}
        />
      ))}
    </Box>
  )
}

export default TimePeriodTabs
