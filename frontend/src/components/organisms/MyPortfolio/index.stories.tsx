import { Meta, StoryFn } from "@storybook/react";
import Portfolio from ".";


export default {
    title: 'Organisms/Myportfolio',
    Component: Portfolio

} as Meta<typeof Portfolio>;

const Template: StoryFn<typeof Portfolio> = (args) => <Portfolio {...args} />

const data = [

    {
        id:'1',
        iconSrc: 'assets/icons/bitcoin.svg',
        currencyType: 'Bitcoin',
        currencyValue: 0.00,
        currencyAcronym: 'BTC',
        isProfit: true,
        profitLoss: '+ 0.00%',
    },

    {
        id:'2',
        iconSrc: 'assets/icons/ethereum.svg',
        currencyType: 'Ethereum',
        currencyValue: 10000000.00,
        currencyAcronym: 'ETH',
        isProfit: false,
        profitLoss: '- 0.00%',
    },
    {
        id:'3',
        iconSrc: 'assets/icons/bitcoin.svg',
        currencyType: 'Bitcoin',
        currencyValue: 1364613,
        currencyAcronym: 'BTC',
        isProfit: true,
        profitLoss: '+ 0.00%',
    },

    {
        id:'4',
        iconSrc: 'assets/icons/ethereum.svg',
        currencyType: 'Ethereum',
        currencyValue: 1245.055,
        currencyAcronym: 'ETH',
        isProfit: false,
        profitLoss: '- 0.00%',
    },
]


export const wallet = Template.bind({});
wallet.args = {
    data: data,
}

