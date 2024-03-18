import { Meta, StoryFn } from "@storybook/react"; 
import MyWallet from ".";

export default {
    title: 'Organisms/myWallet',
    Component: MyWallet,
} as Meta<typeof MyWallet>;

const Template: StoryFn<typeof MyWallet> = (args) => <MyWallet {...args} />

const data=[
    {
        id:1,
        month:'feb',
        day: 25,
        currencyName: 'Bitcoin',
        imgSource: '../assets/icons/success.svg',
        from: 'Jane Cooper',
        status: 'Purchased',
        currencyValue: '+ 0.0010 BTC',
        convertedAmount: '+$1800',
    },
    {
        id:2,
        month:'march',
        day: 22,
        currencyName: 'Bitcoin',
        imgSource: '../assets/icons/success.svg',
        from: 'Jane Cooper',
        status: 'sold',
        currencyValue: '+ 0.0010 BTC',
        convertedAmount: '+$1800',
    },
]

export const MyWallet1 = Template.bind({});
MyWallet1.args = {
    iconSrc:'../assets/icons/bitcoin.svg',
    iconTitle:"Bitcoin",
    iconAcronym:'BTC',
    totalBalance:1243.5,
    data:data,
}

