import { Link } from "react-router-dom"

const LinkPage = () => {
  return (
    <section className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
      <h1 className="text-4xl">Links</h1>
      <br />
      <h2 className="text-2xl">Public</h2>
      <div className="flex flex-col mt-2">
        <Link className="hover:underline" to="/login">
          Login
        </Link>
        <Link className="hover:underline" to="/register">
          Register
        </Link>
      </div>
      <br />
      <h2 className="text-2xl">Private</h2>
      <div className="flex flex-col mt-2">
        <Link className="hover:underline" to="/">
          Home
        </Link>
        <Link className="hover:underline" to="/editor">
          Editors Page
        </Link>
        <Link className="hover:underline" to="/admin">
          Admin Page
        </Link>
      </div>
    </section>
  )
}

export default LinkPage
