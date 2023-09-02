import axios from './config'

export const getCryptos = async () => {
  const user = await axios.get('api/cryptos')
  return user.data
}

export const Crypto_QK = 'queryKey_cryptos'
