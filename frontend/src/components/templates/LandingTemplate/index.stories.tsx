import {StoryFn, Meta} from "@storybook/react";
import LandingTemplate from ".";

export default {
    title:'Templates/LandingTemplate',
    component:LandingTemplate,
} as Meta;

const Template:StoryFn = (args) => <LandingTemplate {...args}/>;

export const Default = Template.bind({});
Default.args = {
}