import { useNavigate, Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"

const Home = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  const signOut = async () => {
    await logout()
    navigate("/linkpage")
  }

  return (
    <section className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
      <h1 className="text-4xl">Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="mt-4">
        <button
          className="bg-black text-slate-300 px-2 py-2 hover:bg-gray-900 rounded-md"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
    </section>
  )
}

export default Home
