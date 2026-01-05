import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { MdPaid } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["paymentStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/pay/payment-count/${user.email}`
      );

      const data = res.data;

      // Ensure stats is always an array
      if (!Array.isArray(data) && data !== null && typeof data === "object") {
        return Object.entries(data).map(([status, count]) => ({
          status,
          count,
        }));
      }

      return Array.isArray(data) ? data : [];
    },
  });

  if (!user || isLoading) {
    return <Loading />;
  }

  return (
    <div className="m-5">
      <div className="flex flex-row gap-4 mb-6" data-aos="fade-right">
        <FaUserLock className="text-2xl text-primary" />
        <h2 className="text-2xl text-primary font-bold">User Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
        {stats.length > 0 ? (
          stats.map((item) => (
            <CardItem
              key={item.status}
              status={item.status}
              count={item.count}
            />
          ))
        ) : (
          <p className="text-primary text-lg">No payment stats available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

const CardItem = ({ status, count }) => {
  return (
    <div className="card w-96 bg-base-100 card-lg shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Payment Status</h2>
        <MdPaid className="text-4xl text-green-600 animate-pulse my-2" />
        <p className="text-xl uppercase text-primary">{status}</p>
        <p className="text-xl text-primary">{count}</p>
      </div>
    </div>
  );
};
