import { Box, Divider, Stack } from '@mui/material'
import React from 'react'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import { PortfolioValueConsts } from '../../../utils/constants'
import Image from '../../atoms/Image'
import Graph from '../../atoms/Graph'
import TimePeriodTabs from '../../molecules/TimePeriod'
import { getFormattedDate, getIndicatorColor, getRelevantIcon } from './utils'
import { AxisTickProps } from '@nivo/axes'

export interface ProtfolioValueProps {
  graphData?: Array<{
    id: string | number
    color: string
    data: Array<{
      x: number | string
      y: number | string
    }>
  }>
  totalInvestmentValue?: string
  isInvestmentUp?: boolean
  investmentPercentageChange?: number
  coinType?: string
  coinValue?: string
  isCoinUp?: boolean
  coinPercentageChange?: number
}

const valueLabelTypographyStyles: React.CSSProperties = {
  color: theme.palette.text.medemp,
}

const valueTextTypographyStyles: React.CSSProperties = {
  color: theme.palette.text.highemp,
}

const graphLegendProps = {
  translateX: 30,
  translateY: -20,
  itemHeight: 14,
  itemWidth: 120,
  itemSpacing: 2,
  symbolSize: 8,
  itemTextColor: theme.palette.gray.black,
}

export const customTick = (tick: AxisTickProps<string>) => {
  return (
    <g
      fill={theme.palette.text.lowemp}
      transform={`translate(${tick.x},${tick.y + 22})`}
    >
      <text
        style={{
          fontFamily: 'Graphik-Regular',
          fontSize: '0.75rem',
          fontWeight: '400',
          lineHeight: '0.875rem',
          textTransform: 'uppercase',
        }}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {getFormattedDate(tick.value)}
      </text>
    </g>
  )
}

const PortfolioValue = (props: ProtfolioValueProps) => {
  const {
    graphData,
    totalInvestmentValue,
    isInvestmentUp,
    investmentPercentageChange,
    coinType,
    coinValue,
    isCoinUp,
    coinPercentageChange,
  } = props
  return (
    <>
      <Stack
        direction={'column'}
        width={'57.97vw'}
        height={'31.01vw'}
        gap={'5vh'}
        padding={'1.25vw'}
        alignItems={'flex-start'}
        border={theme.palette.gray[100]}
      >
        <Stack
          direction={'row'}
          width={'57.97vw'}
          gap={'1.25vw'}
          alignItems={'flex-start'}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'1.25vw'}
          >
            <Stack direction={'column'} gap={theme.spacing(2)}>
              <Stack direction={'row'} alignItems={'center'} gap={'0.4vw'}>
                <TypographyComponent
                  variant="c1"
                  style={valueLabelTypographyStyles}
                >
                  {PortfolioValueConsts.totalInvestmentsText}
                </TypographyComponent>
                <Stack
                  alignItems={'center'}
                  direction={'row'}
                  color={getIndicatorColor(isInvestmentUp ?? true)}
                >
                  <Stack
                    width={'1.25vw'}
                    height={'2.2vh'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Image
                      src={getRelevantIcon(isInvestmentUp ?? true)}
                    ></Image>
                  </Stack>
                  <TypographyComponent variant="overline">
                    {`${isInvestmentUp ?? true ? '+' : '-'} ${
                      investmentPercentageChange ??
                      `${parseFloat('0').toFixed(1)}`
                    }%`}
                  </TypographyComponent>
                </Stack>
              </Stack>
              <TypographyComponent
                variant="subtitle2"
                style={valueTextTypographyStyles}
              >
                {totalInvestmentValue ?? '$ 0.00'}
              </TypographyComponent>
            </Stack>
            {coinType && <Divider orientation="vertical" flexItem />}
            <Stack
              direction={'column'}
              gap={theme.spacing(2)}
              width={'12.90vw'}
            >
              {coinType ? (
                <>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    gap={theme.spacing(1)}
                  >
                    <TypographyComponent
                      variant="c1"
                      style={valueLabelTypographyStyles}
                    >
                      {coinType}
                    </TypographyComponent>

                    <Stack
                      color={getIndicatorColor(isCoinUp ?? false)}
                      alignItems={'center'}
                      direction={'row'}
                      justifyContent={'center'}
                    >
                      <Stack
                        width={'1.25vw'}
                        height={'2.2vh'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                      >
                        <Image src={getRelevantIcon(isCoinUp ?? false)}></Image>
                      </Stack>
                      <TypographyComponent variant="overline">
                        {`${isCoinUp ? '+' : '-'} ${coinPercentageChange}%`}
                      </TypographyComponent>
                    </Stack>
                  </Stack>
                  <TypographyComponent
                    variant="subtitle2"
                    style={valueTextTypographyStyles}
                  >
                    {coinValue}
                  </TypographyComponent>
                </>
              ) : null}
            </Stack>
          </Stack>

          <Stack
            height={'6.58vw'}
            alignItems={'flex-end'}
            gap={'1.25vw'}
            width={'28.47vw'}
            direction={'column'}
          >
            <TimePeriodTabs clicked={true}></TimePeriodTabs>
            <Stack alignItems={'flex-start'} gap={'1.25vw'}>
              <Stack alignItems={'center'} gap={'0.4vw'}></Stack>
            </Stack>
          </Stack>
        </Stack>
        <Box width={'55.5vw'} height={'19.74vw'} justifyContent={'center'}>
          {graphData ? (
            <Graph
              data={graphData}
              showYGridLines={true}
              showXAxis={true}
              margins={{ top: 20, right: 0, bottom: 30, left: 0 }}
              showLegends={true}
              legendProps={graphLegendProps}
              customTick={customTick}
            ></Graph>
          ) : (
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              marginTop={theme.spacing(3)}
            >
              <Image src="assets/icons/data-report.svg"></Image>
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  )
}

export default PortfolioValue
