import ReactDOM from "react-dom/client";
import router from "./routes/routes";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
