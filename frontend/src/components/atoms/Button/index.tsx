import { Button, ButtonProps, SxProps  } from '@mui/material'
interface CustomProps extends ButtonProps {
  onClick?: () => void
  width?: string | number
  height?: string | number
  variant: 'outlined' | 'contained'
  disabled?: boolean
  children?: React.ReactNode
  sx?: SxProps
 }
const CustomButton = (props: CustomProps) => {
  const { width, height, sx,...customProps } = props;
  const buttonStyle = {
    width: width,
    height: height,
    ...sx,
  };
  return <Button sx={buttonStyle} {...customProps}>{props.children}</Button>
}

export default CustomButton
