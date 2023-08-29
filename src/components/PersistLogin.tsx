import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import { isAxiosError } from "axios"
import useLocalStorage from "../hooks/useLocalStorage"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const [persist] = useLocalStorage("persist", false)
  const refresh = useRefreshToken()

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        isAxiosError(error) && console.log(error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading....</p> : <Outlet />}</>
  )
}
export default PersistLogin
