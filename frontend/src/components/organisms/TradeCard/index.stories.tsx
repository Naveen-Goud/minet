import { Meta, StoryFn } from "@storybook/react";
import { GridColDef } from "@mui/x-data-grid";
import theme from "../../../theme";
import TradeCard from ".";
import { ThemeProvider } from "@mui/material";
import { NameComponent, WatchComponent, ChangeComponent } from "./components"
const bitcoin = "../assets/icons/bitcoin.svg"
const ethereum = "../assets/icons/ethereum.svg"
export default {
  title: "Organisms/TradeCard",
  component: TradeCard,
} as Meta;

const Template: StoryFn<typeof TradeCard> = (args) => (
  <ThemeProvider theme={theme}>
    <TradeCard {...args} />
  </ThemeProvider>
)

const columns: GridColDef[] = [
  {
    field: 'Name', headerName: 'Name', 
    renderCell: (params) => {
      const { name, currency, imageSrc} = params.value;
      return <NameComponent name={name} currency={currency} imageSrc={imageSrc}/>;
    },
    width: 250,
  }
  ,
  {
    field: "Price",
    headerName: "Price",
    width: 300,
  },
  {
    field: "Change",
    headerName: "Change",
    renderCell: (params) => {
      const number = params.row.Change;
      return <ChangeComponent number={number}/>
    },
    width: 250,
  },
  {
    field: "MarketCap",
    headerName: "Market Cap",
    width: 250,
  },
  {
    field: "Watch",
    headerName: "Watch",
    width: 100,
    renderCell: (params) => {
      return <WatchComponent row={params.row}/>
    },
  },
];

const rows = [
  {
    id: 1,
    Name: { name : 'Bitcoin', currency: "BTC", imageSrc: bitcoin },
    Price: '$123,000',
    Change: -5.9,
    MarketCap: '$60T',
  },
  {
    id: 2,
    Name: { name : 'Ethereum', currency: "ETH", imageSrc: ethereum },
    Price: '$123,909',
    Change: 2.3,
    MarketCap: '$90T',
  },
  {
    id: 3,
    Name: { name : 'Dogecoin', currency: "DTC", imageSrc: bitcoin },
    Price: '$123,878',
    Change: 1.5,
    MarketCap: '$25T',
  },
];

export const Table = Template.bind({});
Table.args = {
  columns,
  rows,
  tableWidth: 1239,
};