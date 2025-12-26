import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../Components/Loading";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else return <AdminDashboard></AdminDashboard>;
};
export default DashboardHome;
