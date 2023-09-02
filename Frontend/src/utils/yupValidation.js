import * as yup from 'yup'
import { globalError } from './globalErrors'

export const validationSchema = {
  userLogin: yup.object().shape({
    email: yup
      .string()
      .email(globalError.email)
      .required(globalError.emailRequired),
    password: yup
      .string()
      .min(6, globalError.password)
      .required(globalError.passwordRequire),
  }),
}
