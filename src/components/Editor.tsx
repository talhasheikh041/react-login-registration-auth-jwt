import { Link } from "react-router-dom"

const Editor = () => {
  return (
    <section className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
      <h1 className="text-4xl">Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="mt-4">
        <Link className="hover:underline" to="/">
          Home
        </Link>
      </div>
    </section>
  )
}

export default Editor
