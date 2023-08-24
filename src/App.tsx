import Admin from "./components/Admin"
import Editor from "./components/Editor"
import Home from "./components/Home"
import Layout from "./components/Layoyt"
import LinkPage from "./components/LinkPage"
import Login from "./components/Login"
import Lounge from "./components/Lounge"
import Missing from "./components/Missing"
import Register from "./components/Register"
import Unauthorized from "./components/Unauthorized"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Missing />}>
      {/* Public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route index element={<Home />} />
      <Route path="editor" element={<Editor />} />
      <Route path="admin" element={<Admin />} />
      <Route path="lounge" element={<Lounge />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
