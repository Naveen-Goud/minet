import TypographyComponent from '../../atoms/Typography'
import theme from '../../../theme'
import { Box, Divider, Grid } from '@mui/material'
import Image from '../../atoms/Image'
import CustomButton from '../../atoms/Button'
import {
  WalletWatchlistValues,
  WalletWatchListButton,
} from '../../../utils/constants'
interface WalletWatchListProps {
  imageSrc: string
  name: string
  currency: string
  number: number
  marketCap: string
  volume: string
  circulatingSupply: string
  handleClick?: any
}
const starclicked = '../assets/icons/watchlist_star.svg'
const redarrow = '../assets/icons/redarrow.svg'
const greenarrow = '../assets/icons/greenarrow.svg'
const BoxStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: 'max-content',
}
const WalletWatchlist = (props: WalletWatchListProps) => {
  return (
    <Box width={'91vw'} bgcolor={theme.palette.gray.white}>
      <Grid
        container
        alignItems="center"
        justifyContent={'center'}
        sx={{
          border: `1px solid ${theme.palette.gray[100]}`,
          padding: 6,
          borderRadius: '4px',
        }}
      >
        <Grid item xs={2}>
          <Box display={'flex'} alignItems="center">
            <Image src={props.imageSrc} />
            <Box
              display="flex"
              flexDirection={'column'}
              sx={{ marginLeft: 5 }}
              width={100}
            >
              <TypographyComponent
                variant={'subtitle2'}
                style={{ color: theme.palette.gray[500] }}
              >
                {props.name}
              </TypographyComponent>
              <Box alignItems={'center'}>
                <TypographyComponent
                  variant={'c1'}
                  style={{
                    paddingRight: '1vh',
                    color: theme.palette.text.lowemp,
                  }}
                >
                  {props.currency}
                </TypographyComponent>
                <Image
                  src={props.number > 0 ? greenarrow : redarrow}
                  sx={{ margin: '0px 3px' }}
                  alt="Arrow"
                />
                <TypographyComponent
                  variant={'overline'}
                  style={{
                    color:
                      props.number > 0
                        ? theme.palette.semantic.success[500]
                        : theme.palette.semantic.error[500],
                  }}
                >
                  {props.number}%
                </TypographyComponent>
              </Box>
            </Box>
            <Divider
              sx={{ marginLeft: '2vw' }}
              flexItem
              orientation="vertical"
              variant="middle"
            />
          </Box>
        </Grid>

        <Grid item xs={1}>
          <Box sx={BoxStyles}>
            <TypographyComponent
              variant={'c1'}
              style={{ color: theme.palette.text.medemp, marginBottom: '4px' }}
            >
              {WalletWatchlistValues.marketCap}
            </TypographyComponent>
            <TypographyComponent
              variant={'c1'}
              style={{ color: theme.palette.text.highemp }}
            >
              {props.marketCap}
            </TypographyComponent>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box sx={BoxStyles}>
            <TypographyComponent
              variant={'c1'}
              style={{ color: theme.palette.text.medemp, marginBottom: '4px' }}
            >
              {WalletWatchlistValues.volume}
            </TypographyComponent>
            <TypographyComponent
              variant={'c1'}
              style={{ color: theme.palette.text.highemp }}
            >
              {props.volume}
            </TypographyComponent>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box sx={BoxStyles}>
            <TypographyComponent
              variant={'c1'}
              style={{ color: theme.palette.text.medemp, marginBottom: '4px' }}
            >
              {WalletWatchlistValues.circulatingSupply}
            </TypographyComponent>
            <TypographyComponent
              variant={'c1'}
              style={{ color: theme.palette.text.highemp }}
            >
              {props.circulatingSupply}
            </TypographyComponent>
          </Box>
        </Grid>

        <Grid item xs={7} textAlign="right">
          <CustomButton
            variant={'outlined'}
            sx={{ height: 42 }}
            onClick={props.handleClick}
          >
            <Image src={starclicked} width="30px" sx={{ marginRight: '1vw' }} />
            <TypographyComponent
              variant="button"
              children={WalletWatchListButton}
            />
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WalletWatchlist
