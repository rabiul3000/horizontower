import ReactDOM from "react-dom/client";
import router from "./routes/routes";
import './index.css';
import { RouterProvider } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
