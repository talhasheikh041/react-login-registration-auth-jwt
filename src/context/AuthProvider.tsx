import { ReactElement, createContext, useState } from "react"

export type AuthType = {
  user: string | undefined
  pwd: string | undefined
  roles: number[] | undefined
  accessToken: string | undefined
}

type AuthContextType = {
  auth: AuthType | null
  setAuth: React.Dispatch<React.SetStateAction<AuthType | null>>
  persist: boolean
  setPersist: React.Dispatch<React.SetStateAction<boolean>>
}
const AuthContext = createContext({} as AuthContextType)

type AuthProviderProps = {
  children?: ReactElement | undefined
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthType | null>(null)
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") as string) || false
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
