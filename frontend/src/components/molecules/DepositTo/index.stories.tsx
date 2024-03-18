import React from "react";
import DepositTo from ".";
import { Meta, StoryFn } from "@storybook/react";

export default{
    title:'Molecules/DepositTo',
    Component: DepositTo,

}as Meta<typeof DepositTo>;

const Template:StoryFn<typeof DepositTo>=(args)=><DepositTo {...args}/>

export const deposit=Template.bind({});

deposit.args={
    type:'Payment method',
    iconSrc:'../assets/icons/rupee.svg',
    iconTitle:"USD Coin(Cash)",
    remainingBalance:"$300214.2",
}
