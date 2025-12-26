import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdPayment } from "react-icons/md";

const PaymentHistory = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      console.log("Payments:", res.data);
      return res.data;
    },
  });

  console.log(payments);

  if (!user || isPending) {
    return (
      <div>
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <MdPayment size={32} className="text-primary" />
        <h2 className="text-3xl font-bold">Payment History</h2>
      </div>

      <div className="card shadow-xl border rounded-lg">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base">
              <tr>
                <th>#</th>
                <th>Parcel ID</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Payment Method</th>
                <th>Paid At</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <div>
                      <p className="text-lg font-semibold">No payments found</p>
                      <p className="text-sm opacity-70">
                        You haven't completed any transactions yet.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr
                    key={payment.transactionId}
                    className="hover:bg-base-200 transition"
                  >
                    <td>{index + 1}</td>
                    <td className="font-medium">{payment.parcelId}</td>
                    <td>{payment.email}</td>
                    <td className="font-semibold text-primary">
                      ${payment.amount}
                    </td>
                    <td>{payment.transactionId}</td>
                    <td>
                      {Array.isArray(payment.paymentMethod)
                        ? payment.paymentMethod.join(", ")
                        : payment.paymentMethod}
                    </td>

                    {/* Format Paid At */}
                    <td>
                      {payment.paid_at
                        ? new Date(payment.paid_at).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
