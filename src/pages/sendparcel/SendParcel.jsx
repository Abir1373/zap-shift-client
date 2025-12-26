import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import SharedTitle from "../shared/shared_title/SharedTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTrackingLogger from "../../hooks/useTrackingLogger";
useLoaderData;
const SendParcel = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const { user, loading } = useAuth();
  const warehouses = useLoaderData();
  const navigate = useNavigate();
  const { logTracking } = useTrackingLogger();

  // ✅ handle loading state from auth or loader
  if (loading || !warehouses || warehouses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  const generateTrackingID = () => {
    const date = new Date();
    // Date part: YYYYMMDD
    const datePart =
      date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0");
    // Time part: HHMMSS
    const timePart =
      String(date.getHours()).padStart(2, "0") +
      String(date.getMinutes()).padStart(2, "0") +
      String(date.getSeconds()).padStart(2, "0");
    // Random 4–5 digits
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${datePart}-${timePart}-${random}`;
  };

  console.log(generateTrackingID());

  const on_submit = (data) => {
    console.log(data);
    const weight = data.weight || 0;
    const isSameDistrict = data.sender_region === data.receiver_region;
    let cost = 0,
      base_cost = 0,
      extra_cost = 0,
      extra_kg = 0;
    if (data.document_type === "Document") {
      base_cost = isSameDistrict ? 60 : 80;
      cost = base_cost;
    } else {
      base_cost = isSameDistrict ? 110 : 150;
      if (weight <= 3) {
        cost = base_cost;
      } else {
        extra_kg = weight - 3;
        extra_cost = extra_kg * 40;
        cost = base_cost + extra_cost + 40;
      }
    }

    const extraLine = extra_cost
      ? `<p>+40 for extra for outside the district delivery</p>`
      : "";
    let place = isSameDistrict ? "Outside District" : "Same District";
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      html: `
          <div class="text-left text-base">
            <p><strong>Parcel Type:</strong> ${data.document_type}</p>
            <p><strong>Weight:</strong> ${data.weight} kg</p>
            <p><strong>Delivery Zone:</strong> ${place}</p>

            <hr class="solid" />

            <p><strong>Base Cost:</strong> <strong style="color:red">৳${base_cost}</strong></p>
            <p><strong>Extra Charges:</strong> <strong style="color:red">৳${
              extra_cost ? extra_cost : 0
            }</strong></p>

            <br />

            <p class="text-slate-400">
              ${data.document_type} ${data.weight <= 3 ? "under" : "over"} 3kg
              ${isSameDistrict ? "inside" : "outside"} the district
            </p>

            <p>
              <strong>Extra Charge:</strong>
              40 × ${extra_kg > 0.0 ? extra_kg : 0} =
              <strong style="color:red">৳${extra_cost ? extra_cost : 0}</strong>
            </p>
            ${extraLine}

            <hr class="solid" />
            <p>
              <strong style="color: green;">Total Cost: ${cost} Tk</strong>
            </p>
          </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm order!",
    }).then((result) => {
      if (result.isConfirmed) {
        const tracking_id = generateTrackingID();

        const parcelData = {
          ...data,
          cost: cost,
          created_by: user.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          tracking_id: tracking_id,
        };
        // console.log("Ready for payment", parcelData);
        axiosSecure.post("/parcels", parcelData).then(async (res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            // TODO : Here , you nedd to redirect to a payment page or trigger a payment model
            Swal.fire({
              title: "Order Confirmed!",
              text: "Your order has been confirmed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            await logTracking({
              tracking_id: parcelData.tracking_id,
              status: "parcel created",
              details: `Created by ${user.displayName}`,
              updated_by: user.email,
            });
            navigate("/dashboard/myParcels");
          }
        });
      }
    });
  };

  const getDistrictByRegion = (region) => {
    if (!region) return [];
    return warehouses.filter((w) => w.region === region).map((w) => w.district);
  };

  const uniqueRegions = [...new Set(warehouses.map((w) => w.region))];

  const watch_sender_region = watch("sender_region");
  const watch_receiver_region = watch("receiver_region");

  return (
    <form
      className="border-none"
      onSubmit={handleSubmit(on_submit)}
      data-aos="fade-right"
    >
      {/* Parcel Info */}
      <SharedTitle
        title="Send Parcel"
        description="Fill in the details below"
      ></SharedTitle>
      <section className="border-2 border-gray-700 p-4 rounded-xl border-white">
        <h4 className="my-3 text-lg font-bold">Parcel Info</h4>
        <fieldset className="fieldset flex flex-col">
          <label className="w-full">
            <h2 className="text-base">Parcel Name</h2>
            <input
              {...register("parcel_name")}
              type="text"
              className="m-2 w-3/8 input"
              placeholder="Describe your parcel"
            />
          </label>
          <div className="my-4 w-full">
            <h4 className="text-base font-bold">Document Type</h4>
            <div className="flex items-center gap-6 py-5">
              <label className="flex items-center gap-2">
                <input
                  {...register("document_type", { required: true })}
                  type="radio"
                  value="Document"
                  className="radio"
                />
                <span className="text-base">Document</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  {...register("document_type", { required: true })}
                  type="radio"
                  value="Non-document"
                  className="radio"
                />
                <span className="text-base">Non-Document</span>
              </label>

              {errors.document_type && (
                <p className="text-red-400 text-base ml-2">
                  Document type is required
                </p>
              )}
            </div>
          </div>
          <label className="w-full">
            <h2 className="text-base">Weight (kg)</h2>
            <input
              {...register("weight")}
              type="number"
              className="m-2 w-3/8 input"
              placeholder="Enter Weight"
            />
          </label>
        </fieldset>
      </section>
      {/* Sender & Receiver */}
      <section className="flex flex-col lg:flex-row gap-3 my-4">
        {/* Sender Info */}
        <div className="border-2 border-gray-700 p-4 rounded-xl border-white w-full">
          <h2 className="m-4 text-lg font-bold">Sender Info</h2>

          <input
            {...register("sender_name")}
            type="text"
            placeholder="Name"
            className="m-2 w-full input"
          />

          <input
            {...register("sender_contact")}
            type="text"
            placeholder="Contact"
            className="m-2 w-full input"
          />

          <input
            {...register("sender_address")}
            type="text"
            placeholder="Address"
            className="m-2 w-full input"
          />

          <input
            {...register("sender_region")}
            type="text"
            className="m-2 w-full input text-slate-300"
            placeholder="Select Region"
            list="senderRegions"
          />
          <datalist id="senderRegions">
            {uniqueRegions.map((region, id) => (
              <option key={id} value={region} />
            ))}
          </datalist>

          <input
            {...register("sender_service_center")}
            type="text"
            className="m-2 w-full input text-slate-300"
            placeholder="Select Service Center"
            list="senderCenters"
          />
          <datalist id="senderCenters">
            {getDistrictByRegion(watch_sender_region).map((district, index) => (
              <option key={index} value={district} />
            ))}
          </datalist>

          <input
            {...register("sender_pickup_instruction")}
            type="text"
            placeholder="Pickup Instruction"
            className="m-2 h-24 w-full input"
          />
        </div>

        {/* Receiver Info */}
        <div className="border-2 border-gray-700 p-4 rounded-xl border-white w-full">
          <h2 className="m-4 text-lg font-bold">Receiver Info</h2>

          <input
            {...register("receiver_name")}
            type="text"
            placeholder="Name"
            className="m-2 w-full input"
          />

          <input
            {...register("receiver_contact")}
            type="text"
            placeholder="Contact"
            className="m-2 w-full input"
          />

          <input
            {...register("receiver_address")}
            type="text"
            placeholder="Address"
            className="m-2 w-full input"
          />

          <input
            {...register("receiver_region")}
            type="text"
            className="m-2 w-full input text-slate-300"
            placeholder="Select Region"
            list="receiverRegions"
          />
          <datalist id="receiverRegions">
            {uniqueRegions.map((region, id) => (
              <option key={id} value={region} />
            ))}
          </datalist>

          <input
            {...register("receiver_service_center")}
            type="text"
            className="m-2 w-full input text-slate-300"
            placeholder="Select Service Center"
            list="receiverCenters"
          />
          <datalist id="receiverCenters">
            {getDistrictByRegion(watch_receiver_region).map(
              (district, index) => (
                <option key={index} value={district} />
              )
            )}
          </datalist>

          <input
            {...register("receiver_pickup_instruction")}
            type="text"
            placeholder="Pickup Instruction"
            className="m-2 h-24 w-full input"
          />
        </div>
      </section>
      <div className="flex justify-center">
        <button
          type="submit"
          className="btn btn-primary text-black m-4 text-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SendParcel;
