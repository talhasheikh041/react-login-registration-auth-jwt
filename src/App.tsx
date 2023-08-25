import Admin from "./components/Admin"
import Editor from "./components/Editor"
import Home from "./components/Home"
import Layout from "./components/Layoyt"
import LinkPage from "./components/LinkPage"
import Login from "./components/Login"
import Lounge from "./components/Lounge"
import Missing from "./components/Missing"
import Register from "./components/Register"
import RequiredAuth from "./components/RequiredAuth"
import Unauthorized from "./components/Unauthorized"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Missing />}>
      {/* Public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<RequiredAuth allowedRoles={[ROLES.Editor]} />}>
        <Route path="editor" element={<Editor />} />
      </Route>

      <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route
        element={<RequiredAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
      >
        <Route path="lounge" element={<Lounge />} />
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
