import axios from "../api/axios"
import useAuth from "./useAuth"
import { AuthType } from "../context/AuthProvider"

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get("/refresh")
    const accessToken: string = response.data.accessToken
    setAuth((prev) => {
      console.log(JSON.stringify(prev))
      console.log(accessToken)
      return { ...prev, accessToken } as AuthType
    })
    return accessToken
  }

  return refresh
}
export default useRefreshToken
