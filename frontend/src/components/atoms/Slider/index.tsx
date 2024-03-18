import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import theme from '../../../theme'
import { Grid } from '@mui/material'
interface SlideProps {
  min?: number
  max?: number
  value?: any
  handleChange?: any
  step?: any
}
const SliderCustomized = styled(Slider)({
  color: theme.palette.text.lowemp,
  height: '11vh',
  flexDirection: 'column',
  justifyContent: 'center',
  '& .MuiSlider-track': {
    border: 'none',
    color: theme.palette.text.lowemp,
  },
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: theme.palette.text.lowemp,
    border: `3px solid ${theme.palette.text.lowemp}`,
    borderRadius: '100px',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'none',
    },
    '&:before': {
      display: 'none',
    },
  },
})

const SliderComponent = (props: SlideProps) => {
  return (
    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <SliderCustomized
        data-testid="slider"
        orientation="vertical"
        aria-label="slider"
        value={props.value}
        min={props.min}
        step={props.step}
        max={props.max}
        onChange={props.handleChange}
      />
    </Grid>
  )
}

export default SliderComponent
