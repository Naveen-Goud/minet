import { Stack, SxProps, styled } from '@mui/material'
import React from 'react'
import TypographyComponent from '../../atoms/Typography'
import {
  FooterButton,
  FooterCaptions,
  FooterLangauages,
  FooterYear,
} from '../../../utils/constants'
import theme from '../../../theme'
import { TextIcon } from '../../molecules/TextIcon'
import CustomButton from '../../atoms/Button'
import { Theme } from '@nivo/core'

const StyledStack = styled(Stack)`
  background-color: ${theme.palette.primary[100]};
  flex-direction: row;
  height: 6.6vh;
  padding: 2vh 1.5vw;
  align-items: center;
  justify-content: space-between;
`

const CaptionStack = styled(Stack)`
  flex-direction: row;
  gap: 1vw;
`

const CaptionStyle: React.CSSProperties = {
  color: theme.palette.primary[500],
}
const ButtonStyle: React.CSSProperties = {
  color: theme.palette.primary[500],
  backgroundColor: theme.palette.gray.white,
  padding: '20px',
}

const TextStyle: React.CSSProperties = {
  color: theme.palette.text.highemp,
}

const TextIconStyle: SxProps<Theme> = {
  width: '8vw',
  border: `1px solid ${theme.palette.gray[100]}`,
  backgroundColor: theme.palette.gray.white,
  px: '1vw',
  py: '1vh',
  borderRadius: theme.spacing(1),
}

export const DashboardFooter = () => {
  return (
    <StyledStack borderTop={'1px solid ' + theme.palette.gray[100]}>
      <CaptionStack>
        {FooterCaptions.map((caption: string) => (
          <TypographyComponent key={caption} style={CaptionStyle} variant="b2">
            {caption}
          </TypographyComponent>
        ))}
        <TypographyComponent variant="b2" style={TextStyle}>
          {FooterYear}
        </TypographyComponent>
      </CaptionStack>
      <CaptionStack>
        <TextIcon
          variant="b2"
          src="../assets/icons/chervondown.svg"
          sx={TextIconStyle}
        >
          {FooterLangauages}
        </TextIcon>
        <CustomButton
          variant="outlined"
          width="7.5"
          height="3vh"
          sx={ButtonStyle}
        >
          {FooterButton}
        </CustomButton>
      </CaptionStack>
    </StyledStack>
  )
}
