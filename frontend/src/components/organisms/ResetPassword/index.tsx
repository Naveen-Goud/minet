import React, { useState, useEffect } from 'react'
import {
  Box,
  Stack,
  SxProps,
  Theme,
  TextField,
  IconButton,
  Card,
} from '@mui/material'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import { ResetPasswordConstants } from '../../../utils/constants'
import CustomButton from '../../atoms/Button'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Image from '../../atoms/Image'

interface ResetPasswordProps {
  handleLoginButtonClick?: any
  handleResetClick?: any
  reset?: boolean
}

export const ResetPassword = (props: ResetPasswordProps) => {
  const [resetPassword, setResetPassword] = useState('')
  const [reenterPassword, setReenterPassword] = useState('')
  const [resetLinkedDisabled, setResetLinkedDisabled] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showReenterPassword, setShowReenterPassword] = useState(false)
  const [passwordLengthError, setPasswordLengthError] = useState(false)
  const [resetState, setResetState] = useState(false)

  useEffect(() => {
    const isDisabled =
      resetPassword === '' ||
      reenterPassword === '' ||
      resetPassword !== reenterPassword ||
      resetPassword.length < 8
    setResetLinkedDisabled(isDisabled)
  }, [resetPassword, reenterPassword])

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value
    setResetPassword(currentValue)
    if (currentValue.length < 8) {
      setPasswordLengthError(true)
    } else {
      setPasswordLengthError(false)
    }
  }

  const handleReenterPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentValue = event.target.value
    setReenterPassword(currentValue)
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const toggleShowReenterPassword = () => {
    setShowReenterPassword(
      (prevShowReenterPassword) => !prevShowReenterPassword
    )
  }

  const handleSubmit = () => {
    props.handleResetClick(resetPassword)
    setResetState(true)
  }

  const outerStackStyle: SxProps<Theme> = {
    gap: '4vh',
    width: '35.5vw',
  }

  const outerBox: SxProps<Theme> = {
    height: 'auto',
  }

  const headingStyle: React.CSSProperties = {
    color: theme.palette.text.highemp,
  }

  const resetpasswordButtonStyle: React.CSSProperties = {
    height: '6.25vh',
    width: '35.5vw',
    textTransform: 'none',
    color: theme.palette.gray.white,
  }

  const labelStyle: React.CSSProperties = {
    color: theme.palette.text.highemp,
  }

  const clickCardStyle: React.CSSProperties = {
    height: '12.3vh',
    width: '35.5vw',
    padding: '10px',
    gap: '12px',
  }
  const ImageBox: React.CSSProperties = {
    height: '4.1vh',
    width: '32px',
  }
  return (
    <Box sx={outerBox}>
      <Stack sx={outerStackStyle}>
        <TypographyComponent variant="h4" style={headingStyle}>
          {ResetPasswordConstants.heading}
        </TypographyComponent>

        <Stack gap="3vh">
          {resetState && (
            <Card sx={clickCardStyle}>
              <Stack direction={'row'} spacing={'12px'} padding={'24px'}>
                <Stack sx={ImageBox}>
                  <Image src="../assets/icons/tick-circle.svg"></Image>
                </Stack>
                <Stack direction={'column'}>
                  <TypographyComponent
                    variant={'b1'}
                    children={'Password Reset successful'}
                    style={{ color: theme.palette.text.highemp }}
                  />
                  <TypographyComponent
                    variant={'c1'}
                    children={'Click on the button below to proceed to login'}
                    style={{ color: theme.palette.text.lowemp }}
                  />
                </Stack>
              </Stack>
            </Card>
          )}
          {!resetState && (
            <>
              <Stack direction={'column'} gap={'6px'}>
                <TypographyComponent variant="c1" style={labelStyle}>
                  {ResetPasswordConstants.label[0]}
                </TypographyComponent>
                <TextField
                  value={resetPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </Stack>
              {passwordLengthError && (
                <TypographyComponent variant="b2" style={{ color: 'red' }}>
                  Password must be at least 8 characters long.
                </TypographyComponent>
              )}
              <Stack direction={'column'} gap={'6px'}>
                <TypographyComponent variant="c1" style={labelStyle}>
                  {ResetPasswordConstants.label[1]}
                </TypographyComponent>
                <TextField
                  value={reenterPassword}
                  onChange={handleReenterPasswordChange}
                  placeholder="Re-enter new password"
                  type={showReenterPassword ? 'text' : 'password'}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={toggleShowReenterPassword}>
                        {showReenterPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Stack>
              <TypographyComponent variant="c1" style={labelStyle}>
                {ResetPasswordConstants.message[0]}
              </TypographyComponent>
            </>
          )}
          <CustomButton
            onClick={
              !resetState
                ? () => {
                    handleSubmit()
                  }
                : () => {
                    props.handleLoginButtonClick()
                  }
            }
            disabled={resetLinkedDisabled}
            variant="contained"
            sx={resetpasswordButtonStyle}
          >
            {resetState
              ? ResetPasswordConstants.button[1]
              : ResetPasswordConstants.button[0]}
          </CustomButton>
        </Stack>
      </Stack>
    </Box>
  )
}
export default ResetPassword
