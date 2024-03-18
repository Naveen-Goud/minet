import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Image from '../../atoms/Image'
import TypographyComponent from '../../atoms/Typography'
import theme from '../../../theme'
import { styled } from '@mui/system'
import { choosecryptoheading } from '../../../utils/constants'
import numbro from 'numbro'
interface ChooseCryptoProps {
  items: any
  setSelectItem?: any
  selectedCoin?: number
}
const StyledGridContainer = styled(Grid)(() => ({
  maxHeight: '45vh',
  overflow: 'auto',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '0.5vw',
    background: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.gray[300],
    borderRadius: theme.spacing(1),
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.gray[300],
  },
}))

const StyledItemBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '12vw',
  height: '21vh',
}))

const StyledSelectedIconBox = styled(Box)(() => ({
  position: 'absolute',
  top: '2px',
  right: '2px',
}))

const OuterBox = styled(Box)(() => ({
  width: '49.35vw',
  height: '50vh',
  padding: '2vw',
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.gray[100]}`,
  backgroundColor: theme.palette.gray.white,
}))

const Heading = styled(Box)(() => ({
  color: theme.palette.text.highemp,
  marginBottom: theme.spacing(5),
}))

const Name = styled(Typography)(() => ({
  color: theme.palette.gray[500],
  paddingTop: theme.spacing(2),
}))

const Price = styled(Typography)(() => ({
  color: theme.palette.text.medemp,
}))

const ChooseCrypto = (props: ChooseCryptoProps) => {
  const [selectedItem, setSelectedItem] = useState(props.selectedCoin)

  const handleClick = (item: any) => {
    if (props.setSelectItem) props.setSelectItem(item)
    setSelectedItem(item.id)
  }

  return (
    <OuterBox>
      <Heading>
        <TypographyComponent variant={'b1'} children={choosecryptoheading} />
      </Heading>
      <StyledGridContainer container spacing={1}>
        {props.items.map((item: any) => (
          <Grid item xs={3} key={item.id} display={'flex'}>
            <StyledItemBox
              data-testid={item.id}
              onClick={() => handleClick(item)}
              border={
                selectedItem === item.id
                  ? `2px solid ${theme.palette.primary[500]}`
                  : 'none'
              }
              borderRadius={
                selectedItem === item.id ? theme.spacing(1) : 'none'
              }
            >
              <StyledSelectedIconBox
                display={selectedItem === item.id ? 'block' : 'none'}
              >
                <Image src={'../assets/icons/selected.svg'} />
              </StyledSelectedIconBox>
              <Image src={`${item.iconUrl}`} width="56px" height="56px" />
              <Name variant="b1" children={item.name} />
              <Price
                variant="c1"
                children={`$${numbro(item.price).format({
                  thousandSeparated: true,
                })}`}
              />
            </StyledItemBox>
          </Grid>
        ))}
      </StyledGridContainer>
    </OuterBox>
  )
}

export default ChooseCrypto
