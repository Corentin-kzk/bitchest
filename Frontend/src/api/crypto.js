import axios from './config'

export const getCryptos = async (query) => {
  const crypto = await axios.get(
    query ? `api/cryptos?name=${query}` : 'api/cryptos'
  )
  return crypto.data
}

export const getCrypto = async (id) => {
  const crypto = await axios.get(`api/cryptos/${id}`)
  return crypto.data
}

export const buyCrypto = async ({ id, amount }) => {
  console.log('🚀 ~ file: crypto.js:16 ~ buyCrypto ~ id, amount:', id, amount)
  const crypto = await axios.post(`api/cryptos/buy_crypto`, {
    amount,
    id,
  })
  return crypto.data
}

export const Crypto_QK = 'queryKey_cryptos'
