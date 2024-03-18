import { Box, styled } from '@mui/material'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'

interface CustomCurrencyChipProps {
  label: string
  color: string
  onClick: React.MouseEventHandler<HTMLDivElement>
  isActive: boolean
}

const CustomCurrencyChip = (props: CustomCurrencyChipProps) => {
  const { label, color, onClick, isActive } = props

  const labelTypographyStyles: React.CSSProperties = {
    color: theme.palette.text.highemp,
  }

  const CurrencyBox = styled(Box)`
    background-color: ${color};
    cursor: pointer;
    border: ${isActive
      ? `2px solid ${theme.palette.semantic.success[300]}`
      : ''};
  `

  return (
    <CurrencyBox
      boxSizing={'border-box'}
      onClick={onClick}
      width={'max-content'}
      height={'auto'}
      padding={`${theme.spacing(2)} ${theme.spacing(4)}`}
      borderRadius={'4px'}
      data-testid="custom-currency-chip"
      color={color}
    >
      <TypographyComponent variant="b2" style={labelTypographyStyles}>
        {label}
      </TypographyComponent>
    </CurrencyBox>
  )
}
export default CustomCurrencyChip
