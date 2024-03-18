import React, { Component } from "react";
import CryptoCard from '.';
import theme from "../../../theme";
import { Meta, StoryFn } from "@storybook/react";

 export default{
    title:"Molecules/cryptocard",
    Component: CryptoCard,

 }as Meta<typeof CryptoCard>;

 const Template : StoryFn<typeof CryptoCard> =(args: any)=><CryptoCard {...args}/>

 export const card=Template.bind({});

 card.args={
    src:'../assets/icons/bitcoin.svg',
    title:'Bitcoin',
    cost:'$20200.21',
}
 