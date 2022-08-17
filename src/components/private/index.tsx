import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks'
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const auth = useAuth()
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children
}

export default PrivateRoute
