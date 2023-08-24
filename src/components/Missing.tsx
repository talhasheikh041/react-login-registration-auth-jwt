import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <article className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  )
}

export default Missing
