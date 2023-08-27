
import axios from "./config"
import { csrf } from "./crsf";

export const getMyUser = async () => {
    await csrf()
    const user = await axios.get('api/me')
    return user.data
}
