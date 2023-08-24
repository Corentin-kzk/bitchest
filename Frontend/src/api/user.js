import axios from "./config"
import { csrf } from "./crsf";

export const getUser = async () => {
    await csrf()
    try {
        const user = await axios.get('/user')
        return user
    } catch (error) {
        return null
    }
}