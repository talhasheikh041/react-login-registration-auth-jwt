import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <section className="bg-[#1f2937] text-slate-300 p-10 w-96 border border-gray-700 ">
      <h1 className="text-4xl">Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="mb-4">
        <button
          className="bg-black text-slate-300 px-2 py-2 hover:bg-gray-900 rounded-md mt-4"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </section>
  )
}

export default Unauthorized
