import React from "react";
import DeliveryFee from ".";
import { Meta, StoryFn } from "@storybook/react";

export default {
    title: 'Molecules/DeliveryFee',
    Component: DeliveryFee,

} as Meta<typeof DeliveryFee>;

const Template: StoryFn<typeof DeliveryFee> = () => <DeliveryFee />

export const delivery1 = Template.bind({});

delivery1.args = {

}
