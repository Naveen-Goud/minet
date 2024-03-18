import React, { Component } from "react";
import AvatarIcon from ".";
import { Meta, StoryFn } from "@storybook/react";


export default {
    title: "Molecules/AvatarIcon",
    Component: AvatarIcon,
} as Meta<typeof AvatarIcon>;

const Template: StoryFn<typeof AvatarIcon> = (args) => <AvatarIcon {...args} />

export const avatar = Template.bind({});
avatar.args = {
    src: '../assets/icons/Avatar.svg',
}
