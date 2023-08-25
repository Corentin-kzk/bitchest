import { Navigate, Outlet } from "react-router-dom";
import { linkUrl } from "../../utils/linkUrl";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/userReducer";
import { isEqual } from "lodash";

const ProtectedAdmin = () => {
    const user = useSelector(selectUser)
    console.log("🚀 ~ file: ProtectedAdmin.jsx:10 ~ ProtectedAdmin ~ user:", user)
    
    if (isEqual(user?.role, 'admin')) {
        console.log("🚀 ~ file: ProtectedAdmin.jsx:17 ~ ProtectedAdmin ~ isAdmin:", isEqual(user?.role, 'admin'))
        return (
            <Outlet />
        );
    } else {
        return <Navigate to={linkUrl.home} />
    }
}

export default ProtectedAdmin;