import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import useTrackingLogger from "../../../hooks/useTrackingLogger";
import useAuth from "../../../hooks/useAuth";

const AssignRider = () => {
  const AxiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const queryClient = useQueryClient();
  const { logTracking } = useTrackingLogger();
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data.sort(
        (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
      );
    },
  });

  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
    setLoadingRiders(true);
    setRiders([]);

    try {
      const res = await AxiosSecure.get("/riders/available", {
        params: {
          district: parcel.sender_service_center,
        },
      });
      setRiders(res.data);
    } catch (error) {
      console.error("Failed to load riders", error);
    } finally {
      setLoadingRiders(false);
    }
  };

  if (isLoading) {
    <span className="loading loading-spinner text-primary"></span>;
  }

  console.log(parcels);

  const handleAssign = async (parcelId, rider) => {
    try {
      console.log("Assigning rider:", rider, selectedParcel);

      const res = await AxiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderId: rider._id,
        assigned_rider_email: rider.email,
        riderName: rider.name,
      });

      await logTracking({
        tracking_id: selectedParcel.tracking_id,
        status: "rider_assigned",
        details: `Assigned to ${rider.name}`,
        updated_by: user.email,
      });

      // Optional success actions
      setIsModalOpen(false);
      setSelectedParcel(null);

      // Refetch parcels (assigned parcel should disappear)
      queryClient.invalidateQueries(["assignableParcels"]);

      // Refetch riders (to update active/busy status)
      queryClient.invalidateQueries(["availableRiders"]);

      return res.data;
    } catch (error) {
      console.error("Failed to assign rider:", error);
      alert("Failed to assign rider. Please try again.");

      throw error;
    }
  };

  return (
    <div className="overflow-x-auto m-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <MdAssignmentTurnedIn size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Assign Rider</h2>
      </div>

      {/* Table */}
      <table className="table table-xs text-xl">
        <thead>
          <tr className="text-xl">
            <th>Tracking ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Sender Center</th>
            <th>Receiver Center</th>
            <th>Cost</th>
            <th>Created At</th>
            <th className="text-center">Assign Rider</th>
          </tr>
        </thead>

        <tbody className="text-xl">
          {parcels.length > 0 ? (
            parcels.map((parcel, index) => (
              <tr key={parcel._id || index}>
                <td className="text-lg text-center">{parcel.tracking_id}</td>
                <td className="text-lg text-center">{parcel.parcel_name}</td>
                <td className="text-lg text-center">{parcel.document_type}</td>
                <td className="text-lg text-center">
                  {parcel.sender_service_center}
                </td>
                <td className="text-lg text-center">
                  {parcel.receiver_service_center}
                </td>
                <td className="text-lg text-center">{parcel.cost}</td>
                <td>{parcel.creation_date}</td>
                <td>
                  <div className="text-center">
                    <button
                      className="btn btn-outline mx-2 btn-success"
                      onClick={() => openAssignModal(parcel)}
                    >
                      <GiCheckMark /> Assign Rider
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No riders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Available Riders — {selectedParcel?.sender_service_center}
            </h3>

            {loadingRiders ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : riders.length > 0 ? (
              <div className="space-y-3">
                {riders.map((rider) => (
                  <div
                    key={rider._id}
                    className="flex justify-between items-center border p-3 rounded"
                  >
                    <div>
                      <p className="font-semibold">{rider.name}</p>
                      <p className="text-sm text-gray-500">{rider.phone}</p>
                      <p className="text-xs">District: {rider.district}</p>
                    </div>

                    <button
                      className="btn btn-sm btn-primary text-black font-bold"
                      onClick={() => handleAssign(selectedParcel._id, rider)}
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No riders available in this district
              </p>
            )}

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRider;
