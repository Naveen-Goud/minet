import React from "react";
import FormTemplate from "."; 
import { Meta,StoryFn } from "@storybook/react";

export default{
    title:'templates/FormTemplate',
    Component:FormTemplate
}as Meta<typeof FormTemplate>;

const Template : StoryFn<typeof FormTemplate>=(args: any)=><FormTemplate{...args}/>

export  const formtemp=Template.bind({});

formtemp.args={
    leftChildren: 'Image',
    rightChildren: 'forms/content',
    borderColor:'black',
    border:"1px solid"
}