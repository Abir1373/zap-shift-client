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

  const handleView = (parcel) => {
    Swal.fire({
      title: `<strong style="color:#4A90E2;">📦 Parcel Details</strong>`,
      html: `
      <table style="width:100%; text-align:left; border-collapse: collapse;">
        <tr><td style="color:#FF6B6B;"><strong>Parcel Name:</strong></td><td>${
          parcel.parcel_name
        }</td></tr>
        <tr><td style="color:#FF6B6B;"><strong>Document Type:</strong></td><td>${
          parcel.document_type
        }</td></tr>
        <tr><td style="color:#FF6B6B;"><strong>Weight:</strong></td><td>${
          parcel.weight
        } kg</td></tr>
        <tr><td style="color:#4ECDC4;"><strong>Sender:</strong></td><td>${
          parcel.sender_name
        }</td></tr>
        <tr><td style="color:#4ECDC4;"><strong>Sender Contact:</strong></td><td>${
          parcel.sender_contact
        }</td></tr>
        <tr><td style="color:#556270;"><strong>Receiver:</strong></td><td>${
          parcel.receiver_name
        }</td></tr>
        <tr><td style="color:#556270;"><strong>Receiver Contact:</strong></td><td>${
          parcel.receiver_contact
        }</td></tr>
        <tr><td style="color:#C7F464;"><strong>Receiver Address:</strong></td><td>${
          parcel.receiver_address
        }</td></tr>
        <tr><td style="color:#FF6B6B;"><strong>Delivery Status:</strong></td><td>${
          parcel.delivery_status
        }</td></tr>
        <tr><td style="color:#FF6B6B;"><strong>Payment Status:</strong></td><td>${
          parcel.payment_status
        }</td></tr>
        <tr><td style="color:#4A90E2;"><strong>Tracking ID:</strong></td><td>${
          parcel.tracking_id
        }</td></tr>
        <tr><td style="color:#4A90E2;"><strong>Cost:</strong></td><td>$${
          parcel.cost
        }</td></tr>
        <tr><td style="color:#FF6B6B;"><strong>Created By:</strong></td><td>${
          parcel.created_by
        }</td></tr>
        <tr><td style="color:#FF6B6B;"><strong>Creation Date:</strong></td><td>${new Date(
          parcel.creation_date
        ).toLocaleString()}</td></tr>
        <tr><td style="color:#4ECDC4;"><strong>Assigned Rider:</strong></td><td>${
          parcel.assigned_rider_name
        }</td></tr>
      </table>
    `,
      icon: "info",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Close",
      background: "linear-gradient(to right, #FFDEE9, #B5FFFC)", // colorful gradient background
    });
  };

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
