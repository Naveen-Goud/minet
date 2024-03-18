import { Box, Grid, styled } from '@mui/material'
import TypographyComponent from '../../atoms/Typography'
import theme from '../../../theme'
import CustomButton from '../../atoms/Button'
import AvtharIcon from '../../molecules/AvtharIcon'
import { sell, buy } from '../../../utils/constants'

type HeaderProps = {
  headerContent: string,
  sellEnabled: boolean,
  handleSellClick?: any,
  buyEnabled: boolean,
  handleBuyClick?: any,
  sellHidden?: boolean,
  buyHidden?: boolean
}
const StyledGridContainer = styled(Grid)`
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 82px;
  padding: 0px 30px;
  border-bottom: 0.5px solid ${({ borderColor }) => `${borderColor}`};
`;

const DashboardHeader = (props: HeaderProps) => {
  const avatar = "../assets/icons/Avatar.svg"
  return (
    <StyledGridContainer container borderColor={theme.palette.gray[50]}>
      <Grid item>
        <TypographyComponent variant="subtitle2" style={{ color: theme.palette.text.highemp }}>{props.headerContent}</TypographyComponent>
      </Grid>
      <Grid item>
        <Grid container justifyContent="flex-end">
          <Box sx={{ display: props.sellHidden ? 'none' : 'block'}}>
          <CustomButton variant={'contained'} sx={{ marginRight: "10px" }} 
          width="115px" height="42px" color="warning"
            onClick={props.sellEnabled ? props.handleSellClick : null}
          >{sell}</CustomButton>
          </Box>
          <Box sx={{ display: props.buyHidden ? 'none' : 'block'}}>
          <CustomButton variant={'contained'} sx={{ marginRight: "20px"}}
            width="115px" height="42px"
            onClick={props.buyEnabled ? props.handleBuyClick : null}
          >{buy}</CustomButton>
          </Box>
          <Box sx={{
            height: "30px", backgroundColor: theme.palette.gray[100],
            width: "1px", borderRadius: "1px", margin: "5px 20px 0px 0px"
          }}>
          </Box>
          <AvtharIcon src={avatar} alt="avatar with icon" />
        </Grid>
      </Grid>
    </StyledGridContainer>
  )
}

export default DashboardHeader
