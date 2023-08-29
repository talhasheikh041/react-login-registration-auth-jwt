import axios from "../api/axios"
import useAuth from "./useAuth"
import { isAxiosError } from "axios"

const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth(null)
    try {
      await axios("/logout")
    } catch (error) {
      isAxiosError(error) && console.log(error)
    }
  }

  return logout
}
export default useLogout
