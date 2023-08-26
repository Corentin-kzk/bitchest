import axios from "./config"
import * as qs from 'qs'

export const getUsers = async (page, rowOnPage, searchValue, filter) => {
    const querySearch = searchValue ? filter === 'name' ? {name: searchValue} : {id: searchValue} : {}
    const query = qs.stringify({
        per_page: rowOnPage,
        page: page,
        ...querySearch
    })
    const users = await axios.get(query ?`api/users?${query}` : "api/users" )
    return users?.data
}

export const getUser = async (id) => {
    const user = await axios.get(`api/users?id=${id}`)
    return user?.data
}


export const User_QK = 'queryKey_users'