import { useState, useEffect } from "react"
import { AxiosInstance, isAxiosError } from "axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom"

type UserType = {
  username: string
  roles: {
    User: number
    Editor: number
    Admin: number
  }
  password: string
  refreshToken: string
}

const Users = () => {
  const [users, setUsers] = useState<string[] | undefined>()
  const axiosPrivate: AxiosInstance = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        })
        console.log(response.data)
        const usernames: string[] = response.data.map(
          (user: UserType) => user.username
        )
        isMounted && setUsers(usernames)
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error)
          navigate("/login", { state: { from: location }, replace: true })
        }
      }
    }
    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <article>
      <h2 className="text-4xl">Users:</h2>
      {users?.length ? (
        <ul className="list-decimal list-inside mt-4">
          {users.map((user, i) => (
            <li key={i}> {user}</li>
          ))}
        </ul>
      ) : (
        <p>No Users Found!</p>
      )}
    </article>
  )
}
export default Users
