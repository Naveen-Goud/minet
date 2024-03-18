import React from "react";
import WatchList from ".";
import { Meta, StoryFn } from "@storybook/react";

export default{
    title:'Organisms/WatchList',
    Component: WatchList,
}as Meta<typeof WatchList>;

const Template : StoryFn<typeof WatchList>=(args)=> <WatchList {...args}/>

const CryptoData = [
    {
      id: 'ETH',
      color: '#0324fc',
      data: [
        { x: '2023-06-26', y: 220 },
        { x: '2023-06-27', y: 230 },
        { x: '2023-06-28', y: 225 },
        { x: '2023-06-29', y: 240 },
        { x: '2023-06-30', y: 235 },
        { x: '2023-07-01', y: 250 },
        { x: '2023-07-02', y: 245 },
        { x: '2023-07-03', y: 260 },
      ],
    },
  ]
  const margins = { top: 20, right: 20, bottom: 60, left: 80 }
  
  const legendProps = {
    translateX: 0,
    translateY: -10,
    itemHeight: 14,
    itemWidth: 100,
    itemSpacing: 2,
    symbolSize: 8,
    itemTextColor: '#000',
  }

export const watch= Template.bind({});

watch.args={
    src:"../assets/icons/bitcoin.svg" ,
    title:'bitcoin',
    cost:'$30924.22',
    time:'24h',
    margins: margins,
  data: CryptoData,
  showXAxis: false,
  showYGridLines: false,
  gridYValues: [2000, 2500, 3000, 3500, 4000],
  showLegends: true,
  legendProps: legendProps,
 profitloss:"+2.1%"
}