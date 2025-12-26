import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaTruckMoving,
  FaCheckCircle,
  FaBoxOpen,
  FaClock,
} from "react-icons/fa";

const iconMap = {
  delivered: FaCheckCircle,
  in_transit: FaTruckMoving,
  picked_up: FaBoxOpen,
  not_collected: FaClock,
};

const colorMap = {
  delivered: "text-green-600",
  in_transit: "text-blue-600",
  picked_up: "text-yellow-600",
  not_collected: "text-red-600",
};

const colorMap2 = {
  delivered: "#22c55e", // green
  in_transit: "#3b82f6", // blue
  picked_up: "#facc15", // yellow
  not_collected: "#ef4444", // red
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["deliveryStatusCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery/status-count");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10 min-h-[300px]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!stats.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No parcel data available.
      </p>
    );
  }

  const chartData = stats.map((item) => ({
    name: item.status.replace("_", " ").toUpperCase(),
    value: item.count,
    color: colorMap2[item.status] || "#8884d8",
  }));

  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <h2 className="text-3xl font-bold">Parcel Delivery Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = iconMap[item.status] || FaTruckMoving;
          const color = colorMap[item.status] || "text-gray-600";

          return (
            <StatCard
              key={item.status}
              title={item.status.replace("_", " ").toUpperCase()}
              value={item.count}
              icon={Icon}
              color={color}
            />
          );
        })}
      </div>

      {/* Pie Chart */}
      <h2 className="text-3xl font-bold mt-10">
        Parcel Delivery Status Distribution
      </h2>
      <div className="w-full h-96 bg-white rounded-xl shadow-md p-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} parcels`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

const StatCard = ({ title, value, icon, color }) => {
  const IconComponent = icon;

  return (
    <div className="card bg-base-100 shadow-md text-center rounded-lg hover:shadow-lg transition">
      <div className="card-body flex flex-col items-center">
        {IconComponent && (
          <IconComponent className={`text-4xl ${color} mb-2`} />
        )}
        <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
      </div>
    </div>
  );
};
