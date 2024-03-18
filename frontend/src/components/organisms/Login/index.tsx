import { Divider, Link, Stack, SxProps, Theme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../../theme'
import { InputField } from '../../atoms/TextField'
import Image from '../../atoms/Image'
import Button from '../../atoms/Button'
import Typography from '../../atoms/Typography'
import IconPlusTypo from '../../molecules/IconPlusTypo'
import { validate } from './utils'
import { socialLoginArray, LoginFormConstants } from '../../../utils/constants'

export interface LoginOrganismProps {
  handleGoogleLogin: React.MouseEventHandler<HTMLDivElement>
  getFormDataOnSubmit(formDataObj: FormData): void
}

export interface FormData {
  email: string
  password: string
}

const Login = (props: LoginOrganismProps) => {
  const { handleGoogleLogin, getFormDataOnSubmit } = props

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  const setErrorState = (testValue: 'email' | 'password') => {
    setErrors({
      ...errors,
      [testValue]: !validate(testValue, formData),
    })
  }

  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    setCanSubmit(validate('email', formData) && validate('password', formData))
  }, [formData])

  const labelStyles: React.CSSProperties = {
    color: theme.palette.grey[700],
  }

  const forgotPasswordTypographyStyles: React.CSSProperties = {
    textTransform: 'none',
  }

  const signInTypographyStyles: React.CSSProperties = {
    color: theme.palette.gray.white,
  }

  const dividerStyles: SxProps<Theme> = {
    width: '100%',
    color: theme.palette.grey[100],
  }

  const footerTypographStyles: React.CSSProperties = {
    color: theme.palette.text.medemp,
  }
  return (
    <>
      <Stack
        direction={'column'}
        alignItems={'flex-start'}
        gap={theme.spacing(8)}
        width={'34.56vw'}
        height={'79.17vh'}
      >
        <Typography variant="h4">{LoginFormConstants.heading}</Typography>
        <Stack direction={'column'} alignItems={'flex-start'} gap={'6px'}>
          <Typography variant="c2" style={labelStyles}>
            {LoginFormConstants.labels[0]}
          </Typography>
          <InputField
            height="5.47vh"
            placeholder="Email"
            variant="outlined"
            type="email"
            width="34.56vw"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onFocus={() => {
              setErrors({
                ...errors,
                email: false,
              })
            }}
            onBlur={() => setErrorState('email')}
            error={errors.email}
          ></InputField>
        </Stack>
        <Stack direction={'column'} alignItems={'flex-start'} gap={'6px'}>
          <Typography variant="c2" style={labelStyles}>
            {LoginFormConstants.labels[1]}
          </Typography>
          <InputField
            placeholder="Password"
            variant="outlined"
            height="5.47vh"
            type={showPassword ? 'text' : 'password'}
            endicon={
              <Image
                alt="Toggle Password Visibility"
                src={`assets/icons/${showPassword ? 'eye on.svg' : 'eye.svg'}`}
                onClick={() => setShowPassword(!showPassword)}
              ></Image>
            }
            width="34.56vw"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onFocus={() => {
              setErrors({
                ...errors,
                password: false,
              })
            }}
            onBlur={() => setErrorState('password')}
            error={errors.password}
          ></InputField>
        </Stack>
        <Link href="/forgotPassword" underline="none">
          <Typography style={forgotPasswordTypographyStyles} variant="b2">
            {LoginFormConstants.forgotPasswordText}
          </Typography>
        </Link>
        <Button
          width="34.56vw"
          height="5.47vh"
          variant="contained"
          disabled={!canSubmit}
          onClick={() => getFormDataOnSubmit(formData)}
        >
          <Typography variant="button" style={signInTypographyStyles}>
            Sign In
          </Typography>
        </Button>
        <Divider sx={dividerStyles}>
          <Typography variant="c1" style={{ color: theme.palette.text.medemp }}>
            Or
          </Typography>
        </Divider>
        <Stack
          alignItems={'flex-start'}
          gap={'1.39vw'}
          direction={'row'}
          width={'34.56vw'}
        >
          {socialLoginArray.map((socialLogin) => {
            return (
              <IconPlusTypo
                key={socialLogin.labelText}
                iconSrc={socialLogin.iconSrc}
                iconAlt={socialLogin.iconAlt}
                onClick={
                  socialLogin.labelText == 'Google'
                    ? handleGoogleLogin
                    : () => {}
                }
                labelText={socialLogin.labelText}
              ></IconPlusTypo>
            )
          })}
        </Stack>
        <Typography variant="b1" style={footerTypographStyles}>
          {LoginFormConstants.noAccountText[0]}
          <Link href="/" underline="none">
            {LoginFormConstants.noAccountText[1]}
          </Link>
        </Typography>
      </Stack>
    </>
  )
}

export default Login
