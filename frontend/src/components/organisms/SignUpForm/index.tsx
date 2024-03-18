import { Box, Divider, Stack, SxProps, Theme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import {
  PasswordHelper,
  SignUpButton,
  SignUpCaptions,
  SignUpFormHeading,
  SignupFormFieldLabels,
  SignupFormFieldPlaceholders,
  SocialIcons,
} from '../../../utils/constants'
import { InputField } from '../../atoms/TextField'
import Image from '../../atoms/Image'
import CustomButton from '../../atoms/Button'
import IconPlusTypo from '../../molecules/IconPlusTypo'
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'

interface SignUpFormProps {
  onClick?: any
}

export const SignUpForm = (props: SignUpFormProps) => {
  const navigate = useNavigate()
  const { loginWithRedirect }: Auth0ContextInterface<User> = useAuth0()
  const [hide, setHide] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)

  const value = [name, email, password]
  const setValue = [setName, setEmail, setPassword]

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const error = [false, emailError, passwordError]
  const validatePassword = (pwd: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    return passwordRegex.test(pwd)
  }

  const validateEmail = (gm: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(gm)) return true
    else return false
  }
  const hidePassword = () => {
    setHide(!hide)
  }

  useEffect(() => {
    if (
      !validateEmail(email) &&
      validatePassword(password) &&
      name.length > 0
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [name, email, password])
  const changeValue = (
    e: any,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    label: string
  ) => {
    setValue(e.target.value)
    if (label === 'Password') {
      if (!validatePassword(e.target.value)) setPasswordError(true)
      else setPasswordError(false)
    } else if (label === 'Email') {
      if (validateEmail(e.target.value)) setEmailError(true)
      else setEmailError(false)
    }
  }
  const outerStackStyle: SxProps<Theme> = {
    gap: '4vh',
    width: '35.5vw',
  }

  const socialIconsStyle: SxProps<Theme> = {
    gap: '1vw',
  }
  const outerBox: SxProps<Theme> = {
    height: 'auto',
  }

  const signupcaptionStyle: SxProps<Theme> = {
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
  const signupButtonStyle: React.CSSProperties = {
    height: '6.25vh',
    textTransform: 'none',
  }
  const labelStyle: React.CSSProperties = {
    color: theme.palette.text.highemp,
  }
  const passwordHelperStyle: React.CSSProperties = {
    color: theme.palette.gray[500],
  }

  const dividerStyle: SxProps<Theme> = {
    color: theme.palette.gray[100],
  }
  const captionButtonStyle: React.CSSProperties = {
    cursor: 'pointer',
    color: theme.palette.primary[500],
    textTransform: 'none',
  }

  const setEye = hide ? '../assets/icons/eye.svg' : '../assets/icons/eye on.svg'
  return (
    <Box sx={outerBox}>
      <Stack sx={outerStackStyle}>
        <TypographyComponent variant={'h4'} style={headingStyle}>
          {SignUpFormHeading}
        </TypographyComponent>
        <Stack gap={'3vh'}>
          {SignupFormFieldLabels.map((label, index) => (
            <Stack key={label} gap={'1vh'}>
              <TypographyComponent variant={'c1'} style={labelStyle}>
                {label}
              </TypographyComponent>
              <InputField
                id={'inputField' + index}
                error={error[index]}
                value={value[index]}
                type={label === 'Password' && hide ? 'password' : 'text'}
                onChange={(e: any) => {
                  changeValue(e, value[index], setValue[index], label)
                }}
                placeholder={SignupFormFieldPlaceholders[index]}
                height="6.25vh"
                endicon={
                  label === 'Password' ? (
                    <Image
                      onClick={hidePassword}
                      data-testid="eye"
                      src={setEye}
                      alt="eye icon"
                    />
                  ) : null
                }
              />
            </Stack>
          ))}
          <TypographyComponent variant={'c2'} style={passwordHelperStyle}>
            {PasswordHelper}
          </TypographyComponent>
          <CustomButton
            onClick={() => {
              props.onClick(name, email, password)
            }}
            disabled={disabled}
            sx={signupButtonStyle}
            variant={'contained'}
          >
            <TypographyComponent
              variant={'button'}
              style={{ color: theme.palette.gray.white, textTransform: 'none' }}
            >
              {SignUpButton}
            </TypographyComponent>
          </CustomButton>
          <Divider sx={dividerStyle}>
            <TypographyComponent variant={'c1'} style={captionStyle}>
              Or
            </TypographyComponent>
          </Divider>
          <Stack direction={'row'} sx={socialIconsStyle}>
            {SocialIcons.map((icon) => (
              <IconPlusTypo
                onClick={() => {
                  loginWithRedirect({
                    appState: {
                      returnTo: '/dashboard',
                    },
                    authorizationParams: {
                      connection: icon.auth0,
                    },
                  })
                }}
                key={icon.label}
                iconSrc={icon.src}
                labelText={icon.label}
              />
            ))}
          </Stack>
        </Stack>
        <Stack direction={'row'} sx={signupcaptionStyle}>
          <TypographyComponent variant={'b1'} style={captionStyle}>
            {SignUpCaptions[0]}
          </TypographyComponent>
          <Box
            onClick={() => {
              navigate('/login')
            }}
          >
            <TypographyComponent variant={'b1'} style={captionButtonStyle}>
              {SignUpCaptions[1]}
            </TypographyComponent>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
