import { format } from "date-fns"
import { WalletTableProps } from "."

export const extractMonthAndDayFromDay=(date:Date)=>{
    return{
        day:date.getDay(),
        month:format(date,'MMM')
    }
}

export const getTransactionIcon=(state:'pending' | 'completed' | 'failed')=>{
    return `assets/icons/transaction-${state}.svg`

}

export const filterSearch=(data:WalletTableProps['data'],query:string)=>{
    query=query.trim()
    return data.filter((dataItem) => {
        const currencyName = dataItem.currencyName ?? "";
        const from = dataItem.from ?? "";
        const convertedAmount = dataItem.convertedAmount ?? "";
        const transactionState = dataItem.transactionState ?? "";
        return currencyName.toLowerCase().includes(query.toLowerCase())
          || from.toLowerCase().includes(query.toLowerCase())
          || convertedAmount.toString().includes(query)
          || transactionState.toLocaleLowerCase().includes(query);    
      });
}