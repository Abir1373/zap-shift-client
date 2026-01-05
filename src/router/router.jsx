import { createBrowserRouter } from "react-router";

import Home from "../pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/login/Login";
import Register from "../pages/Authentication/register/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/sendparcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/myparcels/MyParcels";
import Payment from "../pages/Dashboard/payment/Payment";
import BeARider from "../pages/Dashboard/be_a_rider/BeARider";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import PendingRiders from "../pages/Dashboard/pending_riders/PendingRiders";
import MakeAdmin from "../pages/Dashboard/makeAdmin/MakeAdmin";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../pages/forbidden/Forbidden";
import ActiveRiders from "../pages/Dashboard/active_riders/ActiveRiders";
import AssignRider from "../pages/Dashboard/assign_rider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/pending_deliveries/PendingDeliveries";
import CompletedDeliveries from "../pages/Dashboard/completed_deliveries/CompletedDeliveries";
import MyEarnings from "../pages/Dashboard/my_earnings/MyEarnings";
import DashboardHome from "../pages/Dashboard/dashboard_home/DashboardHome";
import About from "../pages/about/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("./warehouses.json"),
      },
      {
        path: "beARider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
        loader: () => fetch("./warehouses.json"),
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "sendparcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("./warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },

      // rider route

      {
        path: "pending_deliveries",
        element: (
          <RiderRoute>
            <PendingDeliveries />
          </RiderRoute>
        ),
      },

      {
        path: "completed_deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: "my_earnings",
        element: (
          <RiderRoute>
            <MyEarnings />
          </RiderRoute>
        ),
      },

      // admin routes
      {
        path: "pendingRiders",
        element: (
          <AdminRoute>
            <PendingRiders />
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider />
          </AdminRoute>
        ),
      },
      {
        path: "activeRiders",
        element: (
          <AdminRoute>
            <ActiveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },
    ],
  },
]);
