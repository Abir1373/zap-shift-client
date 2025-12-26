import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import { FaMoneyBillWaveAlt } from "react-icons/fa";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderEarnings", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed_parcels?email=${email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  // 🔹 Calculate earning per parcel
  const calculateEarning = (parcel) => {
    const cost = Number(parcel.cost);
    return parcel.sender_service_center === parcel.receiver_service_center
      ? cost * 0.8
      : cost * 0.3;
  };

  // 🔹 Aggregate earnings
  let totalEarning = 0;
  let totalCashedOut = 0;
  let totalPending = 0;
  let todayEarning = 0;
  let weekEarning = 0;
  let monthEarning = 0;

  parcels.forEach((parcel) => {
    const earning = calculateEarning(parcel);
    const date = parseISO(parcel.creation_date);

    totalEarning += earning;

    if (parcel.cashout_status === "cashed_out") {
      totalCashedOut += earning;
    } else {
      totalPending += earning;
    }

    if (isToday(date)) todayEarning += earning;
    if (isThisWeek(date)) weekEarning += earning;
    if (isThisMonth(date)) monthEarning += earning;
  });

  return (
    <div className="p-6 space-y-8">
      <h2
        data-aos="fade-right"
        className="flex items-left justify-left gap-3 text-3xl font-bold"
      >
        <span className="p-3 rounded-full bg-black-400 text-primary shadow-lg">
          <FaMoneyBillWaveAlt size={28} />
        </span>
        <span className="text-primary">My Earnings</span>
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Earnings" value={totalEarning} />
        <StatCard title="Cashed Out" value={totalCashedOut} />
        <StatCard title="Pending Cashout" value={totalPending} />
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Today" value={todayEarning} />
        <StatCard title="This Week" value={weekEarning} />
        <StatCard title="This Month" value={monthEarning} />
      </div>
    </div>
  );
};

export default MyEarnings;

/* 🔹 Reusable Card Component */
const StatCard = ({ title, value }) => (
  <div className="bg-black-400 rounded-xl shadow p-6 text-center">
    <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
    <p className="text-3xl font-bold  text-primary mt-2">৳{value.toFixed(2)}</p>
  </div>
);
