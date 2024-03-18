import { useState } from 'react'
import { Box, Stack, styled } from '@mui/material'
import {
  changePassword,
  verifyCodeFromServer,
  verifyEmailFromServer,
} from './utils'
import { useNavigate } from 'react-router'
import { ForgotPassword } from '../../components/organisms/ForgotPassword'
import FormTemplate from '../../components/templates/FormTemplate'
import { ForgotPasswordPageConstants } from '../../utils/constants'
import ResetPassword from '../../components/organisms/ResetPassword'

const StyledBox = styled(Box)`
  width: 50vw;
  height: 100vh;
  object-fit: fill;
  background: url(assets/images/password_form_image.svg);
  background-repeat: no-repeat;
  background-size: 100%;
`

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [reset, setReset] = useState(false)
  const [userID, setUserID] = useState(0)
  const [isResetPassword, setIsResetPassword] = useState(false)
  const navigate = useNavigate()

  const handleEmailButtonClick = async (email: string) => {
    try {
      const res = await verifyEmailFromServer(email)
      if (res.status >= 500) {
        alert(ForgotPasswordPageConstants.messages.internalServerError)
      } else if (res.status === 200 && res.data.length > 0) {
        setEmail(email)
        setUserID(res.data[0].id)
        setReset(true)
      } else {
        alert(ForgotPasswordPageConstants.messages.emailNotFound)
      }
    } catch (error) {
      console.error(ForgotPasswordPageConstants.messages.errorOcurred, error)
    }
  }

  const handleResetClick = async (resetCode: string) => {
    try {
      const res = await verifyCodeFromServer(email, resetCode)
      if (res.status >= 500) {
        alert(ForgotPasswordPageConstants.messages.internalServerError)
      } else if (res.status === 200 && res.data.length > 0) {
        setIsResetPassword(true)
      } else {
        alert(ForgotPasswordPageConstants.messages.invalidCode)
      }
    } catch (error) {
      console.error(ForgotPasswordPageConstants.messages.errorOcurred, error)
    }
  }

  const handleResetSubmit = (password: string) => {
    changePassword(userID, password)
  }

  return (
    <>
      <FormTemplate
        leftChildren={<StyledBox></StyledBox>}
        rightChildren={
          <Stack
            direction={'row'}
            alignItems={'center'}
            width={'50vw'}
            height={'100vh'}
          >
            {!isResetPassword ? (
              <ForgotPassword
                reset={reset}
                handleEmailButtonClick={handleEmailButtonClick}
                handleResetClick={handleResetClick}
              />
            ) : (
              <ResetPassword
                handleResetClick={handleResetSubmit}
                handleLoginButtonClick={() => navigate('/login')}
              />
            )}
          </Stack>
        }
      />
    </>
  )
}

export default ForgotPasswordPage
