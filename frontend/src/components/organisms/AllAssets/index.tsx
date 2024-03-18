import { Box, Stack, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  AllAssetsButtonsTitle,
  AllAssetsInputFieldPlaceholder,
  AllAssetsTextIcons,
} from '../../../utils/constants'
import theme from '../../../theme'
import { InputField } from '../../atoms/TextField'
import Image from '../../atoms/Image'
import { TextIcon } from '../../molecules/TextIcon'
import TradeCard from '../TradeCard'
import { columns, handleSearch, setAssetRows, switchAssets } from './utils'
import TypographyComponent from '../../atoms/Typography'

interface StyledStackProps {
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  gap?: React.CSSProperties['gap']
  px?: React.CSSProperties['paddingLeft']
  py?: React.CSSProperties['paddingTop']
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}
const StyledStack = styled(Stack)<StyledStackProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
  padding-left: ${({ px }) => px};
  padding-top: ${({ py }) => py};
  flex-direction: ${({ direction }) => direction};
`
const StyledBox = styled(Box)`
  display: block;
  background-color: ${theme.palette.primary[100]};
  padding-top: ${theme.spacing(3)};
`
const StyledTab = styled(Box)`
  display: flex;
`
const TitleActiveStyle: React.CSSProperties = {
  color: theme.palette.primary[500],
  paddingInline: '2vw',
  paddingBottom: '1vh',
  cursor: 'pointer',
  borderBottom: '2px solid ' + theme.palette.primary[500],
}
const TitleInactiveStyle: React.CSSProperties = {
  color: theme.palette.text.highemp,
  paddingBottom: '1vh',
  paddingInline: '2vw',
  cursor: 'pointer',
}
const setStyle = (flag: boolean) => {
  if (flag) {
    return TitleActiveStyle
  } else {
    return TitleInactiveStyle
  }
}

const IconTextStyle: React.CSSProperties = {
  gap: '0.8vw',
  borderRadius: theme.spacing(1),
  color: theme.palette.gray[500],
  backgroundColor: theme.palette.gray.white,
  paddingBlock: '1vh',
  paddingInline: '1vw',
  border: '1px solid' + theme.palette.gray[100],
  flexWrap: 'nowrap',
}
const endIcon = <Image src="../assets/icons/search.svg" alt="search image" />

interface AllAssetsProps {
  rows?: any
  setAllAssetRows?: any
  allAssetBool?: boolean
  watchlistBool?: boolean
  handleTradeRowClick?: any
}
export const AllAssets = (props: AllAssetsProps) => {
  const [allAssets, setAllAssets] = useState(props.allAssetBool)
  const [watchlist, setWatchlist] = useState(props.watchlistBool)
  const [watchlistRows, setWatchlistRows] = useState<any>([])
  const [inputValue, setInputValue] = useState('')
  const style = [allAssets, watchlist]
  const [allRows, setAllRows] = useState([])

  useEffect(() => {
    setWatchlistRows(setAssetRows(props.rows))
    setAllRows(props.rows.length > allRows.length ? props.rows : allRows)
  }, [props.rows])

  return (
    <StyledBox>
      <StyledStack direction={'row'}>
        <StyledStack
          direction={'row'}
          gap={'1vw'}
          minWidth={'61vw'}
          alignSelf={'stretch'}
          marginRight={'1vw'}
          borderBottom={'2px solid' + theme.palette.gray[100]}
        >
          {AllAssetsButtonsTitle.map((title: string, index: number) => (
            <StyledTab
              onClick={(e: any) =>
                switchAssets(e, title, setAllAssets, setWatchlist)
              }
              key={title}
            >
              <TypographyComponent
                variant="subtitle2"
                style={setStyle(style[index])}
              >
                {title}
              </TypographyComponent>
            </StyledTab>
          ))}
        </StyledStack>
        <StyledStack direction={'row'}>
          <InputField
            id="search"
            value={inputValue}
            onChange={(e: any) =>
              handleSearch(
                e,
                allRows,
                allAssets,
                watchlist,
                props.rows,
                [props.setAllAssetRows, setWatchlistRows],
                setInputValue
              )
            }
            endicon={endIcon}
            height="4.4vh"
            bgcolor={theme.palette.gray.white}
            placeholder={AllAssetsInputFieldPlaceholder}
          />
          <StyledStack direction={'row'} paddingLeft={'1vw'} gap={'1vw'}>
            {AllAssetsTextIcons.map((item) => (
              <TextIcon
                key={item}
                variant="b1"
                src="../assets/icons/chervondown.svg"
                sx={IconTextStyle}
              >
                {item}
              </TextIcon>
            ))}
          </StyledStack>
        </StyledStack>
      </StyledStack>

      {allAssets && (
        <TradeCard
          handleTradeRowClick={props.handleTradeRowClick}
          columns={columns}
          rows={props.rows}
          tableWidth={'auto'}
        />
      )}
      {watchlist && (
        <TradeCard
          handleTradeRowClick={props.handleTradeRowClick}
          columns={columns}
          rows={watchlistRows}
          tableWidth={'auto'}
        />
      )}
    </StyledBox>
  )
}
