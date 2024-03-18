import axios from 'axios'
import { apiBase } from '../../utils/constants';

export const verifyEmailFromServer = async (
  email: string
): Promise<{ data: Array<object>; status: number }> => {
  try {
    const response = await axios.get(`${apiBase}/users`, {
      params: {
        email: email,
      },
    })

    return { data: response.data, status: response.status }
  } catch (error) {
    console.log('Error', error)
    throw error
  }
}
export const verifyCodeFromServer = async (
  email: string,
  resetCode: string
): Promise<{ data: Array<object>; status: number }> => {
  try {
    const response = await axios.get(`${apiBase}/users`, {
      params: {
        email,
        resetCode: parseInt(resetCode),
      },
    })
    return { data: response.data, status: response.status }
  } catch (error) {
    console.log('Error', error)
    throw error
  }
}

export const changePassword=async(userID:number, password:string)=>{
  try{
    const response=await axios.patch(`${apiBase}/users/${userID}`,{
        password:password
    })
    return {status:response.status}
  }
  catch(error){
    console.error(error);
  }
  
}