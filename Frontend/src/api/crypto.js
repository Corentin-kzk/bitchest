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
  const crypto = await axios.post(`api/cryptos/buy`, {
    amount,
    id,
  })
  return crypto.data
}
export const sellCrypto = async ({ cryptoId, transactionId }) => {
  const crypto = await axios.post(`api/cryptos/sell`, {
    cryptoId,
    transactionId,
  })
  return crypto.data
}

export const Crypto_QK = 'queryKey_cryptos'
