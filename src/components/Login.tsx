import { useRef, useState, useEffect } from "react"
import { AxiosError } from "axios"
import axios from "../api/axios"
import { useNavigate, useLocation } from "react-router-dom"

import useAuth from "../hooks/useAuth"

const LOGIN_URL = "/auth"

const Login = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location?.state?.from.pathname || "/"

  const errRef = useRef<HTMLParagraphElement | null>(null)
  const userRef = useRef<HTMLInputElement | null>(null)

  const [errMsg, setErrMsg] = useState("")

  const [user, setUser] = useState("")
  const [pwd, setPwd] = useState("")

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            useCredentials: true,
          },
        }
      )
      console.log(response.data)
      const accessToken: string = response.data.accessToken
      const roles: number[] = response.data.roles
      setAuth({ user, pwd, roles, accessToken })
      setUser("")
      setPwd("")
      navigate(from, { replace: true })
    } catch (error) {
      const err = error as AxiosError
      if (!err?.response) {
        setErrMsg("No Server Response!")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password!")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized!")
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current?.focus()
    }
  }

  return (
    <section className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
      <p
        aria-live="assertive"
        ref={errRef}
        className={
          errMsg
            ? "text-red-600 font-bold mb-4 text-center"
            : "absolute left-[-9999px]"
        }
      >
        {errMsg}
      </p>

      <h1 className="text-4xl font-bold">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-8">
        <label className="text-lg font-semibold" htmlFor="username">
          Username :
        </label>

        <input
          className="bg-[#374151] p-2 rounded-lg mt-2 border border-slate-600 focus:ring-1 focus:ring-blue-500 outline-none"
          type="text"
          name="username"
          id="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          ref={userRef}
          required
        />

        <label className="text-lg font-semibold mt-2" htmlFor="password">
          Password :
        </label>

        <input
          className="bg-[#374151] p-2 rounded-lg mt-2 border border-slate-600 focus:ring-1 focus:ring-blue-500 outline-none"
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          value={pwd}
        />

        <button className="bg-blue-600 mt-8 rounded-lg py-3 text-md font-bold disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-500">
          Sign In
        </button>

        <p className="mt-4 text-sm">
          Need an Account?
          <span className="text-blue-500 hover:underline ml-1">
            <a href="#">Sign Up</a>
          </span>
        </p>
      </form>
    </section>
  )
}
export default Login
