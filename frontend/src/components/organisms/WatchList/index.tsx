import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Image from '../../atoms/Image'
import theme from '../../../theme'
import { CustomChip } from '../../atoms/Chip'
import Graph, { GraphProps } from '../../atoms/Graph'

export interface WatchListProps extends GraphProps {
  graphWidth?: number
  src?: string
  alt?: string
  sx?: string
  title?: string
  cost?: string
  time?: string
  onClick?: () => {}
  GraphProps?: GraphProps
  profitloss?: string
}
const outerBoxStyling = {
  background: theme.palette.gray.white,
  height: '16.92vh',
  width: 'auto',
  justifyContent: 'space-between',
  padding: '24px',
  border: `1px solid ${theme.palette.gray[100]}`,
  borderRadius: 2,
}

const innerBoxStyling = {
  width: '8.611vw',
  height: '10.67vh',
  spacing: `theme.spacing[6]`,
}
const imageStyling = {
  width: '2.9vw',
  height: '5.4vw',
  spacing: '12px',
  paddingRight: '11px',
}
const cardDetailsStyling = {
  direction: 'column',
  spacing: `theme.spacing[6]`,
  height: '5.98vh',
  width: '7.36vw',
}
const graphBox = {
  height: '10.67vh',
  backgroundColor: theme.palette.gray.white,
  border: '1px ',
}
const chipStyling = {
  backgroundColor: theme.palette.gray[50],
  width: '50px',
  height: '18px',
}
const titeboxStyling = {
  width: '7.36vw',
  height: '10.67vh',
  spacing: '12px',
}
const WatchList = (props: WatchListProps) => {
  return (
    <>
      <Grid sx={outerBoxStyling}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack sx={innerBoxStyling}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack sx={imageStyling}>
                <Image src={props.src} />
              </Stack>
              <Stack sx={titeboxStyling}>
                <Stack sx={cardDetailsStyling}>
                  <Typography variant="b1" color={theme.palette.text.highemp}>
                    {props.title}
                  </Typography>
                  <Typography variant="b1" color={theme.palette.text.highemp}>
                    {props.cost}
                  </Typography>
                </Stack>
                <Stack justifyContent={'flex-start'} paddingTop={'13px'}>
                  <CustomChip
                    variant={'filled'}
                    label={props.time}
                    sx={chipStyling}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack width={props.graphWidth + 'vw'} sx={graphBox} gap={'1vh'}>
            <Box>
              <Stack
                direction={'row'}
                alignSelf={'stretch'}
                alignItems={'center'}
                justifyContent={'flex-end'}
              >
                <Image
                  src={
                    props.profitloss?.charAt(0) === '+'
                      ? '../assets/icons/p&l.svg'
                      : '../assets/icons/loss.svg'
                  }
                  sx={{ width: '24px', height: '24px' }}
                />
                <Typography
                  style={{
                    color:
                      props.profitloss?.charAt(0) === '+'
                        ? theme.palette.semantic.success[500]
                        : theme.palette.semantic.error[500],
                  }}
                  variant="overline"
                >
                  {props.profitloss}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Stack
                height={'7.45vh'}
                alignSelf={'stretch'}
                paddingBottom={'4px'}
              >
                <Graph
                  data={props.data}
                  showYGridLines={false}
                  showXAxis={false}
                  showLegends={false}
                  margins={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </>
  )
}

export default WatchList
