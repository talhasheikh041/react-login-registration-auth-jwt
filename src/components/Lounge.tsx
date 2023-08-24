import { Link } from "react-router-dom"

const Lounge = () => {
  return (
    <section className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
      <h1 className="text-4xl">The Lounge</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <div className="mt-2">
        <Link className="hover:underline" to="/">
          Home
        </Link>
      </div>
    </section>
  )
}

export default Lounge
