import { Outlet, useLocation, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

type RequiredAuthProps = {
  allowedRoles?: number[]
}

const RequiredAuth = ({ allowedRoles }: RequiredAuthProps) => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={location} replace />
  ) : (
    <Navigate to="/login" state={location} replace />
  )
}
export default RequiredAuth
