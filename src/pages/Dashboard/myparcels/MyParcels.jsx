import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ParcelTable from "./ParcelTable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { MdPayments } from "react-icons/md";

const MyParcels = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => console.log("View Details:", parcel);

  const handlePay = (parcel) => {
    console.log("Pay:", parcel._id);
    navigate(`/dashboard/payment/${parcel._id}`);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "The parcel has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (error) {
        Swal.fire("Error", error.message || "An error occured");
      }
    }
  };

  console.log(parcels);

  return (
    <div className="p-5">
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <MdPayments size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">My Parcels</h2>
      </div>
      <ParcelTable
        parcels={parcels}
        onView={handleView}
        onPay={handlePay}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MyParcels;
