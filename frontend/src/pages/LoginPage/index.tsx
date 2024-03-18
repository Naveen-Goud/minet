import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react'
import FormTemplate from '../../components/templates/FormTemplate'
import { BackendUrl } from '../../utils/constants'
import Image from '../../components/atoms/Image'
import Login from '../../components/organisms/Login'

export const LoginPage = () => {
  const { loginWithRedirect }: Auth0ContextInterface<User> = useAuth0()
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get(BackendUrl + 'users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        alert(error)
      })
  }, [])
  const navigate = useNavigate()
  const getFormDataOnSubmit = (formData: any) => {
    let userExists = false
    users.forEach((obj: any) => {
      if (obj.email === formData.email && obj.password === formData.password) {
        userExists = true
      }
    })
    if (userExists) navigate('/dashboard')
  }

  const leftChildren = (
    <Image src="../assets/icons/loginimage.svg" alt="login page" width="100%" />
  )
  const rightChildren = (
    <Login
      handleGoogleLogin={() => {
        loginWithRedirect({
          appState: {
            returnTo: '/dashboard',
          },
          authorizationParams: {
            connection: 'google-oauth2',
          },
        })
      }}
      getFormDataOnSubmit={getFormDataOnSubmit}
    />
  )

  return (
    <FormTemplate leftChildren={leftChildren} rightChildren={rightChildren} />
  )
}
