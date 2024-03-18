import { Box, Link, Stack, SxProps, Theme } from '@mui/material'
import React, { useState } from 'react'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import { ForgotPasswordConstants } from '../../../utils/constants'
import { InputField } from '../../atoms/TextField'
import CustomButton from '../../atoms/Button'
import { checkEmail, checkCode } from './utils'
interface ForgotPasswordProps {
  handleEmailButtonClick(email: string): any
  handleResetClick?(resetCode: string): any
  reset: boolean
}

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const [email, setEmail] = useState('')
  const [resetCode, setresetCode] = useState('')
  const [resetLinkedDisabled, setresetLinkedDisabled] = useState(true)
  const [resetPasswordDisabled, setresetPasswordDisabled] = useState(true)

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value)
    const isValidEmail = checkEmail(event.target.value)
    isValidEmail ? setresetLinkedDisabled(false) : setresetLinkedDisabled(true)
  }

  const handleResetCodeChange = (event: any) => {
    setresetCode(event.target.value)
    const isValidCode = checkCode(event.target.value)
    isValidCode
      ? setresetPasswordDisabled(false)
      : setresetPasswordDisabled(true)
  }
  function getOnClick() {
    return props.reset
      ? () => props.handleResetClick?.(resetCode)
      : () => props.handleEmailButtonClick?.(email)
  }
  function getDisabled() {
    let result = false
    if (resetPasswordDisabled) {
      result = true
    }
    return result
  }

  const outerStackStyle: SxProps<Theme> = {
    gap: '4vh',
    width: '35.5vw',
  }
  const outerBox: SxProps<Theme> = {
    height: 'auto',
  }

  const forgotpasswordcaptionStyle: SxProps<Theme> = {
    alignItems: 'center',
    gap: theme.spacing(2),
  }
  const captionStyle: React.CSSProperties = {
    color: theme.palette.text.medemp,
    textTransform: 'none',
  }

  const headingStyle: React.CSSProperties = {
    color: theme.palette.text.highemp,
  }
  const forgotpasswordButtonStyle: React.CSSProperties = {
    height: '6.25vh',
    textTransform: 'none',
    color: theme.palette.gray.white,
    marginTop: '3vh',
  }
  const labelStyle: React.CSSProperties = {
    color: theme.palette.text.highemp,
    marginBottom: '5px',
  }

  const captionButtonStyle: React.CSSProperties = {
    cursor: 'pointer',
    color: theme.palette.primary[500],
    textTransform: 'none',
  }

  return (
    <Box sx={outerBox}>
      <Stack sx={outerStackStyle}>
        <TypographyComponent variant={'h4'} style={headingStyle}>
          {ForgotPasswordConstants.heading}
        </TypographyComponent>

        <Stack>
          <TypographyComponent variant={'c1'} style={labelStyle}>
            {props.reset
              ? ForgotPasswordConstants.label[1]
              : ForgotPasswordConstants.label[0]}
          </TypographyComponent>
          {props.reset ? (
            <InputField
              value={resetCode}
              onChange={handleResetCodeChange}
              placeholder={ForgotPasswordConstants.placeholder[1]}
              height="6.25vh"
            />
          ) : (
            <InputField
              value={email}
              onChange={handleEmailChange}
              placeholder={ForgotPasswordConstants.placeholder[0]}
              height="6.25vh"
            />
          )}
          <CustomButton
            onClick={getOnClick()}
            disabled={props.reset ? getDisabled() : resetLinkedDisabled}
            sx={forgotpasswordButtonStyle}
            variant={'contained'}
          >
            {props.reset
              ? ForgotPasswordConstants.button[1]
              : ForgotPasswordConstants.button[0]}
          </CustomButton>
        </Stack>

        <Stack direction={'row'} sx={forgotpasswordcaptionStyle}>
          <TypographyComponent variant={'b1'} style={captionStyle}>
            {ForgotPasswordConstants.captions[0]}
          </TypographyComponent>
          <Link href="/login" underline='none'>
            <TypographyComponent variant={'b1'} style={captionButtonStyle}>
              {ForgotPasswordConstants.captions[1]}
            </TypographyComponent>
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}
