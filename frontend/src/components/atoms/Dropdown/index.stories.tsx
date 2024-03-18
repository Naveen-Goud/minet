import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Dropdown, DropdownProps } from '.';

 export default {
           title: 'atoms/dropdown',
            component: Dropdown,
} as Meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;
const Option = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
export const Default = Template.bind({});

Default.args={
     options:Option,
};

 
  
  
 