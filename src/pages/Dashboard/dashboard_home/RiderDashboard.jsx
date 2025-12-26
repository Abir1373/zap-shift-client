import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import { FaUserLock } from "react-icons/fa";
import { MdPaid } from "react-icons/md";

const RiderDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["deliveryStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/delivery/status-count/${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
  });

  if (!user || isLoading) {
    return <Loading />;
  }

  return (
    <div className="m-5">
      {/* Header */}
      <div
        data-aos="fade-right"
        className="flex items-center gap-4 text-2xl text-primary font-bold mb-6"
      >
        <FaUserLock />
        <span>Rider Dashboard</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item) => (
          <CardItem key={item.status} status={item.status} count={item.count} />
        ))}
      </div>
    </div>
  );
};

export default RiderDashboard;

const CardItem = ({ status, count }) => {
  return (
    <div className="card w-96 bg-base-100 card-lg shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Payment Status</h2>
        <h2 className="card-title text-lg">
          <MdPaid className="text-4xl text-green-600 animate-pulse" />
        </h2>
        <p className="text-xl uppercase text-primary">{status}</p>
        <p className="text-xl text-primary">{count}</p>
      </div>
    </div>
  );
};
