import { useQuery } from '@tanstack/react-query'
import { getMyUser } from '../api/me'

const useMyUser = () => {
  const {
    isError,
    data: user,
    isSuccess,
  } = useQuery({
    queryKey: [userQueryKey],
    queryFn: getMyUser(),
  })
  return { user, isError, isSuccess }
}
export const userQueryKey = 'userQK'
export default useMyUser
