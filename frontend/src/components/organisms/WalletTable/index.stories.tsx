import React from 'react'
import { Story, Meta } from '@storybook/react'
import WalletTable, { WalletTableProps } from '.'

export default {
  title: 'Organisms/WalletTable',
  component: WalletTable,
} as Meta

const data = [
  {
    id: 1,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'John Doe',
    currencyValue: '0.5 BTC',
    convertedAmount: '$5000',
    transactionState: 'pending',
  },
  {
    id: 2,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'Jane Smith',
    currencyValue: '1.2 BTC',
    convertedAmount: '$12000',
    transactionState: 'pending',
  },
  {
    id: 3,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'Jane Smith',
    currencyValue: '1.2 BTC',
    convertedAmount: '$12000',
    transactionState: 'pending',
  },
  {
    id: 4,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'Jane Smith',
    currencyValue: '1.2 BTC',
    convertedAmount: '$12000',
    transactionState: 'pending',
  },
  {
    id: 5,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'Jane Smith',
    currencyValue: '1.2 BTC',
    convertedAmount: '$12000',
    transactionState: 'completed',
  },
  {
    id: 6,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'Jane Smith',
    currencyValue: '1.2 BTC',
    convertedAmount: '$12000',
    transactionState: 'pending',
  },
  {
    id: 7,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'Jane Smith',
    currencyValue: '1.2 BTC',
    convertedAmount: '$12000',
    transactionState: 'pending',
  },
  {
    id: 8,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'David Johnson',
    currencyValue: '0.8 BTC',
    convertedAmount: '$8000',
    transactionState: 'failed',
  },
  {
    id: 9,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'David Johnson',
    currencyValue: '0.8 BTC',
    convertedAmount: '$8000',
    transactionState: 'failed',
  },
  {
    id: 10,
    date: new Date(),
    status: 'Purchased',
    currencyName: 'Bitcoin',
    from: 'David Johnson',
    currencyValue: '0.8 BTC',
    convertedAmount: '$8000',
    transactionState: 'failed',
  },
]

const Template: Story<WalletTableProps> = (args) => <WalletTable {...args} />

export const Default = Template.bind({})
Default.args = {
  data: data,
}
