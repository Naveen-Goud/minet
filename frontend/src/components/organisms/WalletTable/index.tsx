import { Box, Divider, Stack, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../../theme'
import { InputField } from '../../atoms/TextField'
import { TextIcon } from '../../molecules/TextIcon'
import { WalletTableConsts } from '../../../utils/constants'
import {
  extractMonthAndDayFromDay,
  filterSearch,
  getTransactionIcon,
} from './utils'
import { TransactionCard } from '../../molecules/TransactionCard'
export interface WalletTableProps {
  data: Array<{
    id: number
    date: Date
    status: string
    currencyName?: string
    from?: string
    currencyValue?: string
    convertedAmount?: string
    transactionState: 'pending' | 'completed' | 'failed'
  }>
}

const WalletTable = (props: WalletTableProps) => {
  const { data } = props

  const [tableData, setTableData] = useState(data)
  useEffect(() => {
    setTableData(data)
  }, [data])
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    setTableData(filterSearch(data, e.target.value))
  }

  const StyledContainerBox = styled(Box)`
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 5px;
      background: none;
      max-height: 145.64px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.palette.gray[300]};
      border-radius: ${theme.spacing(1)};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${theme.palette.gray[300]};
    }
  `
  const textIconsStyles = {
    padding: `0 ${theme.spacing(2)}`,
    height: '40px',
    width: '60px',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.gray[100]}`,
    gap: theme.spacing(1),
    backgroundColor: theme.palette.gray.white,
  }

  return (
    <>
      <Stack
        direction={'column'}
        gap={theme.spacing(3)}
        bgcolor={theme.palette.primary[100]}
      >
        <Stack
          bgcolor={theme.palette.primary[100]}
          direction={'row'}
          justifyContent={'flex-end'}
          alignItems={'flex-start'}
          gap={theme.spacing(3)}
        >
          <InputField
            variant="outlined"
            placeholder="Search all assets"
            height="40px"
            width="25.47vw"
            bgcolor={theme.palette.gray.white}
            endicon={
              <Stack
                direction={'row'}
                gap={theme.spacing(2)}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <img src="assets/icons/search.svg" alt="search" />
                <Divider orientation="vertical" flexItem />
                <img src="assets/icons/filter.svg" alt="filter" />
              </Stack>
            }
            onChange={handleSearch}
            value={searchInput}
          ></InputField>
          <TextIcon
            src="assets/icons/chervondown.svg"
            variant="b1"
            sx={textIconsStyles}
          >
            {WalletTableConsts.filterText}
          </TextIcon>
        </Stack>
        <StyledContainerBox>
          <Stack
            bgcolor={theme.palette.gray.white}
            border={`1px solid ${theme.palette.gray[100]}`}
            direction={'column'}
            gap={theme.spacing(3)}
            padding={`${theme.spacing(6)} ${theme.spacing(6)} ${theme.spacing(
              6
            )} ${theme.spacing(6)}`}
          >
            {tableData.map((item) => {
              const { day, month } = extractMonthAndDayFromDay(item.date)
              const imgSrc = getTransactionIcon(item.transactionState)
              return (
                <Box
                  key={item.id}
                  borderBottom={`1px solid ${theme.palette.grey[100]}`}
                  paddingBottom={theme.spacing(4)}
                >
                  <TransactionCard
                    status={item.status}
                    month={month}
                    day={day}
                    currencyName={item.currencyName}
                    currencyValue={item.currencyValue}
                    convertedAmount={item.convertedAmount}
                    imgSource={imgSrc}
                    from={item.from}
                  />
                </Box>
              )
            })}
          </Stack>
        </StyledContainerBox>
      </Stack>
    </>
  )
}

export default WalletTable
