import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { GiCheckMark } from "react-icons/gi";
import Swal from "sweetalert2";
import { RiPassPendingFill } from "react-icons/ri";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { logTracking } = useTrackingLogger();

  // Load parcels assigned to the current rider
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/parcels?email=${user.email}`);
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

  // HANDLE PICK UP

  const handlePickupParcel = async (parcel) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/pickup`, {
        riderId: parcel.assigned_rider_id,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Parcel Picked Up",
          timer: 1500,
          showConfirmButton: false,
        });

        await logTracking({
          tracking_id: parcel.tracking_id,
          status: "Parcel Picked Up",
          details: `Picked Up by ${user.displayName}`,
          updated_by: user.email,
        });

        await refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to deliver parcel", "error");
    }
  };

  // HANDLE DELIVER PARCEL

  const handleDeliverParcel = async (parcel) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/deliver`, {
        riderId: parcel.assigned_rider_id,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Parcel Delivered",
          timer: 1500,
          showConfirmButton: false,
        });

        await logTracking({
          tracking_id: parcel.tracking_id,
          status: "delivered",
          details: `Delivered by ${user.displayName}`,
          updated_by: user.email,
        });

        await refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to deliver parcel", "error");
    }
  };

  return (
    <div className="m-5">
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <RiPassPendingFill size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Pending Riders</h2>
      </div>
      <h2 className="text-2xl font-bold mb-5">Pending Deliveries</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra table-md">
          <thead>
            <tr>
              <th className="text-lg text-center">#</th>
              <th className="text-lg text-center">Tracking ID</th>
              <th className="text-lg text-center">Parcel</th>
              <th className="text-lg text-center">Sender</th>
              <th className="text-lg text-center">Receiver</th>
              <th className="text-lg text-center">Receiver Address</th>
              <th className="text-lg text-center">Cost</th>
              <th className="text-lg text-center">Status</th>
              <th className="text-lg text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel.tracking_id} className="text-center">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{parcel.tracking_id}</td>
                  <td>
                    <p>{parcel.parcel_name}</p>
                    <p className="text-xs text-gray-500">
                      {parcel.document_type} | {parcel.weight}kg
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

                  {parcel.delivery_status === "in_transit" && (
                    <td>
                      <div className="text-center flex">
                        <button
                          className="btn btn-outline mx-2 btn-success "
                          onClick={() => handlePickupParcel(parcel)}
                        >
                          <GiCheckMark /> Pick Up Parcel
                        </button>
                      </div>
                    </td>
                  )}
                  {parcel.delivery_status === "picked_up" && (
                    <td>
                      <div className="text-center flex">
                        <button
                          className="btn btn-outline mx-2 btn-success "
                          onClick={() => handleDeliverParcel(parcel)}
                        >
                          <GiCheckMark /> Deliver Parcel
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No pending deliveries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
