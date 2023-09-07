import axios from './config'
import { csrf } from './crsf'

export const getMyUser = async () => {
  await csrf()
  const user = await axios.get('api/me')
  return user.data
}

export const updateMe = async ({
  name,
  email,
  balance,
  password,
  confirmPassword,
}) => {
  const user = await axios.patch('api/me', {
    name,
    email,
    balance,
    password,
    confirmPassword,
  })
  return user.data
}

export const getMyWallet = async () => {
  const user = await axios.get('api/me/wallet')
  return user.data
}

export const MyWallet_QK = 'queryKey_myWallet'
export const MyUser_QK = 'queryKey_myUser'
