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
import Announcements from "../pages/Announcements/Announcements";
import ProtectedProfileRoute from "../pages/dashboard/controlRoutes/ProtectedProfileRoute";
import UserProfile from "../pages/dashboard/user/UserProfile";
import MakeAnnouncement from "../pages/dashboard/admin/MakeAnnouncement";
import AdminRoutes from "../pages/dashboard/controlRoutes/AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "apartment", element: <Apartment /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      { index: true, element: <ProtectedProfileRoute><UserProfile /></ProtectedProfileRoute> },
      { path: "announcements", element: <Announcements /> },
      { path: "user", element: <UserDashboard /> },
      { path: "member", element: <MemberDashboard /> },

      
      { path: "make_announcement", element:<AdminRoutes><MakeAnnouncement /></AdminRoutes> },
    ],
  },
  {
    path: "*",
    element: <div className="text-center text-2xl p-8">404 | Page Not Found</div>,
  },
]);

export default router;
