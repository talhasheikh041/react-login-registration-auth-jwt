import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthProvider } from "./context/AuthProvider"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

if (import.meta.env.PROD) {
  disableReactDevTools()
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
