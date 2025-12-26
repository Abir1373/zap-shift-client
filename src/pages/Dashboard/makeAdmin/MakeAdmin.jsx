import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");

  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["search-users", searchEmail],
    enabled: !!searchEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      return res.data;
    },
  });

  const changeUserRole = async (id, email, user_role) => {
    const new_user_role = user_role === "user" ? "admin" : "user";
    console.log(id, email, user_role, new_user_role);
    try {
      const res = axiosSecure.patch(`/users/${id}/role`, {
        role: new_user_role,
      });

      console.log(res.data);
      await refetch();
      Swal.fire({
        title: "🎉 User Role Changed!",
        text: "The user's role has been successfully updated.",
        icon: "success", // success, error, warning, info, question
        iconColor: "#4ade80", // custom icon color (green)
        background: "#1e293b", // dark background
        color: "#f0f9ff", // text color
        confirmButtonText: "Awesome!",
        confirmButtonColor: "#22d3ee", // turquoise button
        showClass: {
          popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
        },
        toast: false, // set true if you want a small toast popup instead of modal
        timer: 8000, // auto close after 2.5 seconds
        timerProgressBar: true,
      });
    } catch (error) {
      console.error(error.messaage);
    }
  };

  return (
    <div className="m-5">
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <FaUserShield size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Make Admin</h2>
      </div>

      {/* Search Input */}
      <div className="flex flex-col">
        <label className="text-xl font-bold">Search User by Email</label>
        <input
          type="text"
          placeholder="Type email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border px-3 py-2 rounded w-2/5 mt-3"
        />
      </div>

      {/* Loading */}
      {isPending && (
        <p className="mt-4 text-primary font-semibold">Search User</p>
      )}

      {/* Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="table table-zebra text-lg">
            <thead>
              <tr className="text-xl">
                <th>Id</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Last Login</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} index={index}>
                  <td className="text-lg">{user._id}</td>
                  <td className="text-lg">{user.email}</td>
                  <td className="text-lg">{user.created_at}</td>
                  <td className="text-lg">{user.last_log_in}</td>
                  <td className="text-lg">{user.role}</td>
                  <td className="text-lg w-full">
                    <button
                      onClick={() =>
                        changeUserRole(user._id, user.email, user.role)
                      }
                      className="btn btn-outline btn-accent"
                    >
                      {user.role == "user" ? "Make Admin" : "Make User"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results */}
      {!isPending && searchEmail && users.length === 0 && (
        <p className="mt-5 text-gray-500 text-primary">No users found</p>
      )}
    </div>
  );
};

export default MakeAdmin;
