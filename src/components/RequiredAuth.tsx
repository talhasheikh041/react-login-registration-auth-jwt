import { Outlet, useLocation, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import jwt_decode from "jwt-decode"

type RequiredAuthProps = {
  allowedRoles?: number[]
}

type DecodedType = {
  UserInfo: {
    username: string
    roles: number[]
  }
}

const RequiredAuth = ({ allowedRoles }: RequiredAuthProps) => {
  const { auth } = useAuth()
  const location = useLocation()

  const decoded: DecodedType | undefined = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined

  const roles = decoded?.UserInfo.roles || []

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={location} replace />
  ) : (
    <Navigate to="/login" state={location} replace />
  )
}
export default RequiredAuth
