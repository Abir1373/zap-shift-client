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
    queryKey: ["paymentStatus", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/pay/payment-count/${user.email}`
      );
      return res.data;
    },
  });

  if (!user || isLoading) {
    return <Loading />;
  }

  return (
    <div className="m-5 flex-row sm:flex-col">
      <h2
        data-aos="fade-right"
        className="text-2xl text-primary font-bold flex flex-row gap-4"
      >
        <h2 className="pt-1">
          <FaUserLock />
        </h2>
        <h2>User Dashboard</h2>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
        {stats.map((item) => (
          <CardItem key={item.status} status={item.status} count={item.count} />
        ))}
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
        <h2 className="card-title text-lg">
          <MdPaid className="text-4xl text-green-600 animate-pulse" />
        </h2>
        <p className="text-xl uppercase text-primary">{status}</p>
        <p className="text-xl text-primary">{count}</p>
      </div>
    </div>
  );
};
