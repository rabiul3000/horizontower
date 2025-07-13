import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Apartment from "../pages/Apartment/Apartment";
import DashBoardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import MemberDashboard from "../pages/dashboard/member/MemberDashboard";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "apartment", // no leading slash
        element: <Apartment />,
      },
      {
        path: "register", // no leading slash
        element: <Register />,
      },
      {
        path: "login", // no leading slash
        element: <Login />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "member",
        element: <MemberDashboard />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
    ],
  },
]);

export default router;
