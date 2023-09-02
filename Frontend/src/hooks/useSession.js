import { useState } from 'react'

export const useSession = () => {
  const [session, setSession] = useState(() => {
    try {
      const value = window.sessionStorage.getItem('session')
      if (value) {
        return JSON.parse(value)
      } else {
        return null
      }
    } catch (err) {
      return defaultValue
    }
  })
  const setValue = (newValue) => {
    try {
      window.sessionStorage.setItem('session', JSON.stringify(newValue))
    } catch (err) {}
    setSession(newValue)
  }
  const destroySession = () => {
    window.sessionStorage.removeItem('session')
  }
  return { session, setValue, destroySession }
}
