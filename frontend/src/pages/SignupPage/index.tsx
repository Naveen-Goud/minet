import React from 'react'
import FormTemplate from '../../components/templates/FormTemplate'
import Image from '../../components/atoms/Image'
import { SignUpForm } from '../../components/organisms/SignUpForm'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BackendUrl } from '../../utils/constants'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const createUser = async (userDetails: {
    username: string
    email: string
    password: string
  }) => {
    axios
      .post(BackendUrl + 'users', userDetails)
      .then((response) => {
        if (response.status === 201) {
          navigate('/dashboard')
        } else {
          alert('user already exists')
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  const handleSingup = async (
    name: string,
    email: string,
    password: string
  ) => {
    const userDetails = {
      username: name,
      email: email,
      password: password,
    }
    await createUser(userDetails)
  }
  const leftChildren = (
    <Image src="../assets/icons/signup.svg" alt="singup page" width="100%" />
  )

  const rightChildren = <SignUpForm onClick={handleSingup} />
  return (
    <FormTemplate leftChildren={leftChildren} rightChildren={rightChildren} />
  )
}
