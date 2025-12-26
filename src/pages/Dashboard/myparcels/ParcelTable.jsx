const ParcelTable = ({ parcels, onView, onPay, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>

              {/* Document or Non-document */}
              <td className="uppercase"> {parcel.parcel_name} </td>
              <td className="uppercase">
                <span
                  className={`badge ${
                    parcel.document_type === "Document"
                      ? "badge-info"
                      : "badge-secondary"
                  }`}
                >
                  {parcel.document_type}
                </span>
              </td>

              {/* Created At */}
              <td>{formatDate(parcel.creation_date)}</td>

              {/* Cost */}
              <td>{parcel.cost} ৳</td>

              {/* Payment Status */}
              <td>
                <span
                  className={`badge px-3 py-2 ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status === "paid" ? "Paid" : "Unpaid"}
                </span>
              </td>

              {/* Action Buttons */}
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => onView(parcel)}
                >
                  View
                </button>

                {parcel.payment_status === "unpaid" && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => onPay(parcel)}
                  >
                    Pay
                  </button>
                )}

                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onDelete(parcel._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
