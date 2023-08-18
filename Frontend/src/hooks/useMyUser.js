import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user";

const useMyUser = () => {
 const {isError, data: user, isSuccess}= useQuery({
    queryKey: [userQueryKey],
    queryFn: getUser()
 })
    return {user, isError, isSuccess};
}
export const userQueryKey = 'userQK'
export default useMyUser;