import { Navigate, Outlet } from "react-router-dom";
import { isEmpty } from "lodash";
import {  useSession } from "../../hooks/useSession";

const IsConnected = () => {
    const {session} = useSession()    
    if (!isEmpty(session)) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }
}

export default IsConnected;