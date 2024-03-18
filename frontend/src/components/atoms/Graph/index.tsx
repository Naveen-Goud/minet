import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Box } from '@mui/material'
import { AxisTickProps } from '@nivo/axes'

export interface GraphProps {
  data: Array<{
    id: string | number
    color: string
    data: Array<{
      x: number | string
      y: number | string
    }>
  }>
  showYGridLines: boolean
  showXAxis: boolean
  gridYValues?: Array<string | number>
  showLegends: boolean
  margins: { top: number; right: number; bottom: number; left: number }
  legendProps?: {
    translateX: number
    translateY: number
    itemHeight: number
    itemWidth: number
    itemSpacing: number
    symbolSize: number
    itemTextColor: string
  }
  customTick?(tick: AxisTickProps<string>): React.JSX.Element
}

//While using this component, always wrap it inside a parent container(Box,div,etc) having some height, otherwise it would not render

const Graph = (props: GraphProps) => {
  const {
    data,
    showYGridLines,
    legendProps,
    showLegends,
    margins,
    showXAxis,
    customTick,
  } = props
  const [graphData, setGraphData] = useState(
    Array<{
      id: string | number
      color: string
      data: Array<{
        x: number | string | Date
        y: number | string | Date
      }>
    }>
  )

  useEffect(() => {
    console.log('graph', data)

    setGraphData(data)
  }, [data])

  return (
    <>
      <Box height={'inherit'} width={'inherit'}>
        <ResponsiveLine
          data={graphData}
          axisLeft={{ tickValues: 0 }} //We don't have Y axis values visible in any graph inside the figma,so we won't need it
          margin={margins}
          yScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          colors={{ datum: 'color' }}
          enablePoints={false}
          curve="natural"
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
            useUTC: false,
          }}
          xFormat="time:%Y-%m-%d"
          axisBottom={
            showXAxis
              ? {
                  tickValues: 5,
                  format: '%b %d',
                  tickPadding: 10,
                  renderTick: customTick,
                }
              : { tickValues: 0, format: '', tickPadding: 10 } //Hide the X axis as per showXAxis
          }
          enableArea={true}
          enableGridX={false}
          enableGridY={showYGridLines}
          legends={
            showLegends
              ? [
                  {
                    anchor: 'top-right',
                    direction: 'row',
                    justify: false,
                    translateX: legendProps?.translateX,
                    translateY: legendProps?.translateY,
                    itemWidth: legendProps?.itemWidth ?? 0,
                    itemHeight: legendProps?.itemHeight ?? 0,
                    itemsSpacing: legendProps?.itemSpacing,
                    symbolSize: legendProps?.symbolSize,
                    symbolShape: 'circle',
                    itemDirection: 'left-to-right',
                    itemTextColor: legendProps?.itemTextColor,
                  },
                ]
              : undefined
          }
          useMesh={true}
        />
      </Box>
    </>
  )
}
export default Graph
