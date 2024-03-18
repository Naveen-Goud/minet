import { validationsPatterns } from '../../../utils/constants'
import { FormData } from '.'

export const validate = (
  testValue: 'email' | 'password',
  formData: FormData
) => {
  return validationsPatterns[testValue].test(formData[testValue])
}
