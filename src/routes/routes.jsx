import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Apartment from "../pages/Apartment/Apartment";
import DashBoardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Announcements from "../pages/Announcements/Announcements";
import ProtectedProfileRoute from "../pages/dashboard/controlRoutes/ProtectedProfileRoute";
import UserProfile from "../pages/dashboard/user/UserProfile";
import MakeAnnouncement from "../pages/dashboard/admin/MakeAnnouncement";
import AdminRoutes from "../pages/dashboard/controlRoutes/AdminRoutes";
import AgreementRequests from "../pages/dashboard/admin/AgreementRequests";
import ManageCoupons from "../pages/dashboard/admin/ManageCoupons";
import MakePayment from "../pages/dashboard/member/MakePayment";
import MemberRoutes from "../pages/dashboard/controlRoutes/MemberRoutes";
import Payment from "../pages/dashboard/member/Payment";
import PaymentHistory from "../pages/dashboard/member/PaymentHistory";
import ManageMembers from "../pages/dashboard/admin/ManageMembers";
import NotFound from "../pages/NotFound/NotFound";
import AuthRoute from "../pages/dashboard/controlRoutes/AuthRoute";
import AboutBuilding from "../components/AboutBuilding/AboutBuilding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "apartment", element: <Apartment /> },
      { path: "about", element: <AboutBuilding /> },
      { path: "register", element: <AuthRoute> <Register /> </AuthRoute> },
      { path: "login", element: <AuthRoute> <Login /> </AuthRoute> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <ProtectedProfileRoute><UserProfile /></ProtectedProfileRoute>,
      },
      { path: "announcements", element: <Announcements /> },

      // admin routes ---------------------------------------
     
      {
        path: "make_announcement",
        element: <AdminRoutes><MakeAnnouncement /></AdminRoutes>,
      },
      
      {
        path: "agreement_requests",
        element: <AdminRoutes><AgreementRequests /></AdminRoutes>,
      },
      {
        path: "manage_coupons",
        element: <AdminRoutes><ManageCoupons /></AdminRoutes>,
      },
        {
        path: "manage_members",
        element: <AdminRoutes><ManageMembers /></AdminRoutes>,
      },

      // members routes ---------------------------------------
      {
        path: "make_payment",
        element: <MemberRoutes><MakePayment /></MemberRoutes>,
      },
      {
        path: "payment",
        element: <MemberRoutes><Payment /></MemberRoutes>,
      },
      {
        path: "payment_history",
        element: <MemberRoutes><PaymentHistory /></MemberRoutes>,
      },
    
    ],
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);

export default router;