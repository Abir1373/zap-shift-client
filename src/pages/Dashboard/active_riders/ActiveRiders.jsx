import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiCheckMark } from "react-icons/gi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { VscCompassActive } from "react-icons/vsc";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { isPending, data: riders = [] } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // 🔍 Filter riders for table
  const displayedRiders = searchTerm
    ? riders.filter((rider) =>
        rider.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : riders;

  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  return (
    <div className="overflow-x-auto m-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <VscCompassActive size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Active Riders</h2>
      </div>

      {/* Search */}
      <div className="flex flex-col">
        <label className="text-2xl font-bold my-5">Search</label>
        <input
          type="text"
          placeholder="Search riders by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-2/5 m-5"
        />
      </div>

      {/* Table */}
      <table className="table table-xs text-xl">
        <thead>
          <tr className="text-xl">
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>District</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-xl">
          {displayedRiders.length > 0 ? (
            displayedRiders.map((rider, index) => (
              <tr key={rider._id || index}>
                <td className="text-lg">{rider.name}</td>
                <td className="text-lg">{rider.email}</td>
                <td className="text-lg">{rider.region}</td>
                <td className="text-lg">{rider.district}</td>
                <td className="text-lg">{rider.phone}</td>
                <td className="text-lg">{rider.status}</td>
                <td>
                  <div className="text-center">
                    <button className="btn btn-outline mx-2 btn-success">
                      <GiCheckMark /> Active
                    </button>
                    <button className="btn btn-outline btn-error mx-2">
                      <RiDeleteBack2Fill /> Deactive
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
    </div>
  );
};

export default ActiveRiders;
