import { useRef, useState, useEffect, useContext } from "react"
import axios, { AxiosError } from "axios"
import AuthContext from "../context/AuthProvider"

const LOGIN_URL = "http://localhost:3500/auth"

export const action = async () => {}

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext)

  const errRef = useRef<HTMLParagraphElement | null>(null)
  const userRef = useRef<HTMLInputElement | null>(null)

  const [errMsg, setErrMsg] = useState("")

  const [user, setUser] = useState("")
  const [pwd, setPwd] = useState("")

  const [success, setSuccess] = useState(false)

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
      setSuccess(true)
      console.log(auth)
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
  }

  return (
    <>
      {success ? (
        <section className="bg-[#1f2937] text-slate-300 p-10 w-96 flex flex-col justify-center items-center border border-gray-700 ">
          <h1>Login Successful!</h1>
          <p className="mt-4">
            <a href="#" className="text-lg underline hover:text-blue-400 ">
              Go to home
            </a>
          </p>
        </section>
      ) : (
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

          {success && (
            <p className="text-green-600 font-bold mb-4 text-center">
              Login Successful!
            </p>
          )}

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
      )}
    </>
  )
}
export default Login
