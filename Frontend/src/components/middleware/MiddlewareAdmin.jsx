import { Navigate, Outlet } from 'react-router-dom'
import { linkUrl } from '../../utils/linkUrl'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/userReducer'
import { isEqual } from 'lodash'
import { useSession } from '../../hooks/useSession'

const ProtectedAdmin = () => {
  const { session } = useSession()
  const user = useSelector(selectUser)

  if (isEqual(user?.role, 'admin') || isEqual(session.role, 'admin')) {
    return <Outlet />
  } else {
    return <Navigate to={linkUrl.home} />
  }
}

export default ProtectedAdmin
