import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MdIncompleteCircle } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completedDeliveries", email],
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

  // 🔹 Calculate rider earning
  const calculateEarning = (parcel) => {
    const cost = Number(parcel.cost);
    if (parcel.sender_service_center === parcel.receiver_service_center) {
      return cost * 0.8;
    }
    return cost * 0.3;
  };

  // 🔹 Cashout handler
  const handleCashout = async (parcel) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/cashout`);

      if (res.data.modifiedCount > 0) {
        alert("Cashout successful");
        refetch();
      }
    } catch (error) {
      console.error("Cashout error:", error);
      alert("Failed to cash out");
    }
  };

  return (
    <div className="m-5">
      <div data-aos="fade-right" className="flex items-center gap-3 mb-6">
        <MdIncompleteCircle size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Completed Deliveries</h2>
      </div>

      <h2 className="text-2xl font-bold mb-5">Delivery History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra table-md">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Tracking ID</th>
              <th className="text-center">Title</th>
              <th className="text-center">From</th>
              <th className="text-center">To</th>
              <th className="text-center">Address</th>
              <th className="text-center">Fee</th>
              <th className="text-center">Status</th>
              <th className="text-center">Your Earning</th>
              <th className="text-center">Cashout</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id} className="text-center text-sm">
                  <td>{index + 1}</td>

                  <td className="font-semibold">{parcel.tracking_id}</td>

                  <td>
                    <p>{parcel.parcel_name}</p>
                    <p className="text-xs text-gray-500">
                      {parcel.document_type} | {parcel.weight || 0}kg
                    </p>
                  </td>

                  <td>
                    <p>{parcel.sender_name}</p>
                    <p className="text-xs text-gray-500">
                      {parcel.sender_contact}
                    </p>
                  </td>

                  <td>
                    <p>{parcel.receiver_name}</p>
                    <p className="text-xs text-gray-500">
                      {parcel.receiver_contact}
                    </p>
                  </td>

                  <td>{parcel.receiver_address}</td>

                  <td>৳{parcel.cost}</td>

                  <td>
                    <span className="badge badge-warning">
                      {parcel.delivery_status}
                    </span>
                  </td>

                  <td className="font-semibold text-green-600">
                    ৳{calculateEarning(parcel).toFixed(2)}
                  </td>

                  <td>
                    {parcel.cashout_status === "cashed_out" ? (
                      <button className="btn btn-primary flex text-black">
                        <GiCheckMark /> Cashed Out
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline btn-success flex"
                        onClick={() => handleCashout(parcel)}
                      >
                        Cashout
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 ">
                  No completed deliveries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
