import { useRef, useState, useEffect } from "react"
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios, { AxiosError } from "axios"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = "http://localhost:3500/register"

const Register = () => {
  const userRef = useRef<HTMLInputElement | null>(null)
  const errRef = useRef<HTMLParagraphElement | null>(null)

  const [user, setUser] = useState("")
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState("")
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (userRef.current) userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry")
      return
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      console.log(response.data)
      console.log(JSON.stringify(response))
      setSuccess(true)
      // clear the input fields
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError
        if (!err?.response) {
          setErrMsg("No Server Response")
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken")
        } else {
          setErrMsg("Registration Failed")
        }
        errRef.current?.focus()
      }
    }
  }

  return (
    <>
      {success ? (
        <section className="bg-[#1f2937] text-slate-300 p-10 w-96 flex flex-col justify-center items-center border border-gray-700 ">
          <h1>Registration Successful!</h1>
          <p className="mt-4">
            <a href="#" className="text-lg underline hover:text-blue-400 ">
              Sign In
            </a>
          </p>
        </section>
      ) : (
        <section className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
          <p
            ref={errRef}
            aria-live="assertive"
            className={
              errMsg
                ? " text-red-600 font-bold mb-4 text-center"
                : "absolute left-[-9999px]"
            }
          >
            {errMsg}
          </p>

          <h1 className="text-4xl font-bold">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col mt-8">
            <label className="text-lg font-semibold" htmlFor="username">
              Username :
              <span className={validName ? "text-green-500 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validName || !user ? "hidden" : "text-red-500 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              className="bg-[#374151] p-2 rounded-lg mt-2 border border-slate-600 focus:ring-1 focus:ring-blue-500 outline-none"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? false : true}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p
              className={
                userFocus && user && !validName
                  ? "mt-2 bg-black p-3 text-sm rounded-lg"
                  : "absolute left-[-9999px]"
              }
              id="uidnote"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label className="text-lg font-semibold mt-2" htmlFor="password">
              Password :
              <span className={validPwd ? "text-green-500 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validPwd || !pwd ? "hidden" : "text-red-500 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              className="bg-[#374151] p-2 rounded-lg mt-2 border border-slate-600 focus:ring-1 focus:ring-blue-500 outline-none"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? false : true}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <p
              className={
                pwdFocus && pwd && !validPwd
                  ? "mt-2 bg-black p-3 text-sm rounded-lg"
                  : "absolute left-[-9999px]"
              }
              id="pwdnote"
            >
              <FontAwesomeIcon className="mr-1" icon={faInfoCircle} />
              8 to 24 characters. <br />
              Must include uppercase and lowercase, a number and a special
              character. <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label className="text-lg font-semibold mt-2" htmlFor="confirm_pwd">
              Confirm Password :
              <span
                className={
                  validMatch && matchPwd ? "text-green-500 ml-2" : "hidden"
                }
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validMatch || !matchPwd ? "hidden" : "text-red-500 ml-2"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              className="bg-[#374151] p-2 rounded-lg mt-2 border border-slate-600 focus:ring-1 focus:ring-blue-500 outline-none"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? false : true}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "mt-2 bg-black p-3 text-sm rounded-lg"
                  : "absolute left-[-9999px]"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Must match the first password input field.
            </p>

            <button
              className="bg-blue-600 mt-8 rounded-lg py-3 text-md font-bold disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-500"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm">
            Already Registered?
            <span className="text-blue-500 hover:underline ml-1">
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}
export default Register
