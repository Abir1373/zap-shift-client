import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiCheckMark } from "react-icons/gi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { VscCompassActive } from "react-icons/vsc";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all active + deactive riders
  const {
    isLoading,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active-deactive");
      return res.data;
    },
  });
  // rider new

  // Filter riders by search term
  const displayedRiders = searchTerm
    ? riders.filter((rider) =>
        rider.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : riders;

  // Handle Activate / Deactivate
  const handleActivationStatus = async (rider, newStatus) => {
    try {
      await axiosSecure.patch(`/riders/${rider._id}/status`, {
        status: newStatus, // "active" or "deactive"
        work_status: newStatus === "active" ? "available" : "blocked",
        email: rider.email,
      });
      // Refresh list after update
      await refetch();
    } catch (error) {
      console.error("Failed to update rider status:", error);
    }
  };

  if (isLoading) {
    return (
      <span className="loading loading-spinner text-primary text-2xl">
        Loading riders...
      </span>
    );
  }

  return (
    <div className="overflow-x-auto m-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <VscCompassActive size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Riders</h2>
      </div>

      {/* Search */}
      <div className="flex flex-col mb-5">
        <label className="text-2xl font-bold mb-2">Search Riders</label>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-2/5"
        />
      </div>

      {/* Table */}
      <table className="table table-xs text-lg border">
        <thead>
          <tr className="text-lg font-semibold">
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>District</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {displayedRiders.length > 0 ? (
            displayedRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>{rider.status}</td>
                <td className="text-center">
                  <button
                    className="btn btn-outline btn-success mx-2"
                    onClick={() => handleActivationStatus(rider, "active")}
                    disabled={rider.status === "active"}
                  >
                    <GiCheckMark /> Active
                  </button>
                  <button
                    className="btn btn-outline btn-error mx-2"
                    onClick={() => handleActivationStatus(rider, "deactive")}
                    disabled={rider.status === "deactive"}
                  >
                    <RiDeleteBack2Fill /> Deactive
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                No riders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveRiders;
