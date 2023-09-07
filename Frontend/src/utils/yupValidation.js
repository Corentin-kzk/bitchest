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
      .required(globalError.passwordRequired),
  }),
  cryptoBuy: yup.object().shape({
    amount: yup
      .number()
      .positive(globalError.negativeValue)
      .required(globalError.requiredAmount),
  }),
  userAdminEdit: yup.object().shape({
    email: yup
      .string()
      .email(globalError.email)
      .required(globalError.emailRequired),
    name: yup.string().required(globalError.nameRequired),
    role: yup.string().required(globalError.roleRequired),
  }),
  userMeEdit: yup.object().shape({
    email: yup
      .string()
      .email(globalError.email)
      .required(globalError.emailRequired),
    name: yup.string().required(globalError.nameRequired),
    password: yup.string().min(6, globalError.passwordMinLength),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], globalError.passwordMatch),
    balance: yup.number().positive(globalError.negativeValue).nullable(),
  }),
}
