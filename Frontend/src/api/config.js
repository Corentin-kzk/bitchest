import Axios from 'axios'

Axios.defaults.withCredentials = true

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'Content-type',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default axios
