
import axios from "./config"
import { csrf } from "./crsf";

export const getMyUser = async () => {
    await csrf()
    try {
        const user = await axios.get('/me')
        return user
    } catch (error) {
        return null
    }
}
