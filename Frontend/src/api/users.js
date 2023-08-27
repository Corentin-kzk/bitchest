import axios from "./config"
import * as qs from 'qs'

export const getUsers = async (page, rowOnPage, searchValue, filter) => {
    const querySearch = searchValue ? filter === 'name' ? { name: searchValue } : { id: searchValue } : {}
    const query = qs.stringify({
        per_page: rowOnPage,
        page: page,
        ...querySearch
    })
    const users = await axios.get(query ? `api/users?${query}` : "api/users")
    return users?.data
}

export const getUser = async (id) => {
    const user = await axios.get(`api/users/${id}`)
    return user?.data
}

export const editUser = async ({values, id}) => {
    return await axios.patch(`api/users/${id}`, { ...values } )
}

export const createUser = async ({values}) => {
    return await axios.post(`api/users`, { ...values } )
}

export const deleteUser = async ({id}) => {
    return await axios.delete(`api/users/${id}`)
}


export const User_QK = 'queryKey_users'