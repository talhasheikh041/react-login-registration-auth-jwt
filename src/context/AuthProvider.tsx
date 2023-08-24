import { ReactElement, createContext, useState } from "react"

type AuthType = {
  user: string
  pwd: string
  roles: number[]
  accessToken: string
}

type AuthContextType = {
  auth: AuthType | null
  setAuth: React.Dispatch<React.SetStateAction<AuthType | null>>
}
const AuthContext = createContext({} as AuthContextType)

type AuthProviderProps = {
  children?: ReactElement | undefined
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthType | null>(null)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
