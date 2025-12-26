import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiCheckMark } from "react-icons/gi";
import { RiDeleteBack2Fill, RiPassPendingFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });
  console.log(riders);

  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  const handleShowInfo = (rider) => {
    console.log(rider);
    Swal.fire({
      title: `<span style="color:#4f46e5; font-weight:700;">Rider Information</span>`,
      html: `
    <div style="
      text-align:left; 
      padding:12px;
      font-size:15px;
      line-height:1.5;
    ">
      <p><strong style="color:#2563eb;">Name:</strong> <span style="color:#111827;">${
        rider.name
      }</span></p>
      <p><strong style="color:#2563eb;">Age:</strong> <span style="color:#111827;">${
        rider.age
      }</span></p>
      <p><strong style="color:#2563eb;">Email:</strong> <span style="color:#111827;">${
        rider.email
      }</span></p>
      <p><strong style="color:#2563eb;">Phone:</strong> <span style="color:#111827;">${
        rider.phone
      }</span></p>
      <p><strong style="color:#2563eb;">NID:</strong> <span style="color:#111827;">${
        rider.nid
      }</span></p>
      <p><strong style="color:#2563eb;">Region:</strong> <span style="color:#111827;">${
        rider.region
      }</span></p>
      <p><strong style="color:#2563eb;">District:</strong> <span style="color:#111827;">${
        rider.district
      }</span></p>
      <p><strong style="color:#2563eb;">Bike Brand:</strong> <span style="color:#111827;">${
        rider.bikeBrand
      }</span></p>
      <p><strong style="color:#2563eb;">Bike Reg Number:</strong> <span style="color:#111827;">${
        rider.bikeRegNumber
      }</span></p>

      <p style="padding:8px; background:#fef3c7; border-left:4px solid #f59e0b; border-radius:4px;">
        <strong style="color:#b45309;">Status:</strong> 
        <span style="color:#92400e; font-weight:600;">${rider.status}</span>
      </p>

      <p><strong style="color:#2563eb;">Created At:</strong> 
      <span style="color:#111827;">${new Date(
        rider.created_at
      ).toLocaleString()}</span></p>

      <p style="padding:8px; background:#e0e7ff; border-left:4px solid #4f46e5; border-radius:4px;">
        <strong style="color:#4338ca;">ID:</strong> 
        <span style="color:#1e3a8a;">${rider._id}</span>
      </p>
    </div>
  `,
      width: 500,
      background: "#f9fafb",
      icon: "info",
      confirmButtonColor: "#4f46e5",
      confirmButtonText: "Close",
    });
  };

  const handleRider = async (id, decision, work_status, email) => {
    console.log(id, decision);
    try {
      const status = decision;
      const res = await axiosSecure.patch(`/riders/${id}/status`, {
        status,
        email,
        work_status,
      });
      console.log(res.data.acknowledged);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${decision}`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto m-5">
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <RiPassPendingFill size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Pending Riders</h2>
      </div>
      <table className="table table-xs text-xl">
        <thead>
          <tr className="text-xl">
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>District</th>
            <th>Phone</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xl">
          {riders.map((rider, index) => (
            <tr key={index + 1}>
              <td className="text-lg"> {rider.name} </td>
              <td className="text-lg">{rider.email}</td>
              <td className="text-lg">{rider.region}</td>
              <td className="text-lg">{rider.district}</td>
              <td className="text-lg">{rider.phone}</td>
              <td>
                <div className="text-center">
                  <button
                    className="btn btn-outline mx-2 btn-info"
                    onClick={() => handleShowInfo(rider)}
                  >
                    <FaInfoCircle />
                  </button>
                  <button
                    className="btn btn-outline mx-2 btn-success"
                    onClick={() =>
                      handleRider(rider._id, "active", "free", rider.email)
                    }
                  >
                    <GiCheckMark />
                  </button>
                  <button
                    className="btn btn-outline btn-error mx-2 "
                    onClick={() =>
                      handleRider(rider._id, "decline", "free", rider.email)
                    }
                  >
                    <RiDeleteBack2Fill />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRiders;
