import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import SharedTitle from "../../shared/shared_title/SharedTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");

  const serviceCenters = useLoaderData();

  const regions = [...new Set(serviceCenters.map((s) => s.region))];

  const districts = serviceCenters
    .filter((s) => s.region === selectedRegion)
    .map((s) => s.district);

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    console.log("Rider Application : ", riderData);

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Good job!",
          text: "You submitted the rider application !",
          icon: "success",
        });
      }
    });

    // reset form

    reset();
  };

  const desc =
    "Apply to become a verified delivery rider by submitting your personal details, region, bike information, and identification. Your application will be reviewed, and the default status will remain pending until approved.";

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl" data-aos="fade-right">
      <SharedTitle title="Be A Rider" description={desc}></SharedTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className="grid grid-cols-1 gap-4"
      >
        {/* NAME */}
        <div className="my-2">
          <label className="font-semibold">Name</label>
          <input
            {...register("name")}
            readOnly
            value={user?.displayName || ""}
            className="w-full border p-2 rounded  cursor-not-allowed"
          />
        </div>
        {/* email */}
        <div className="my-2">
          <label className="font-semibold">Email</label>
          <input
            {...register("email")}
            readOnly
            value={user?.email || ""}
            className="w-full border p-2 rounded  cursor-not-allowed"
          />
        </div>

        {/* AGE */}
        <div className="my-2">
          <label className="font-semibold">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* PHONE */}
        <div className="my-2">
          <label className="font-semibold">Phone Number</label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border p-2 rounded "
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* REGION */}
        <div className="my-2">
          <label className="font-semibold">Region</label>
          <select
            {...register("region", { required: "Region is required" })}
            onChange={(e) => {
              setValue("region", e.target.value); // update RHF manually
              setSelectedRegion(e.target.value); // update local state
            }}
            className="w-full border p-2 rounded"
          >
            <option value="" className="bg-black">
              Select Region
            </option>
            {regions.map((r) => (
              <option className="bg-black" key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region.message}</p>
          )}
        </div>

        {/* DISTRICT */}
        <div className="my-2">
          <label className="font-semibold">District</label>
          <select
            {...register("district", { required: "District is required" })}
            className="w-full border p-2 rounded"
            disabled={!selectedRegion}
          >
            <option value="" className="bg-black">
              Select District
            </option>
            {districts.map((d) => (
              <option className="bg-black" key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        {/* NATIONAL ID */}
        <div className="my-2">
          <label className="font-semibold">National ID Number</label>
          <input
            {...register("nid", { required: "NID is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.nid && (
            <p className="text-red-500 text-sm">{errors.nid.message}</p>
          )}
        </div>

        {/* BIKE BRAND */}
        <div className="my-2">
          <label className="font-semibold">Bike Brand</label>
          <input
            {...register("bikeBrand", { required: "Bike brand is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.bikeBrand && (
            <p className="text-red-500 text-sm">{errors.bikeBrand.message}</p>
          )}
        </div>

        {/* BIKE REG NUMBER */}
        <div className="my-2">
          <label className="font-semibold">Bike Registration Number</label>
          <input
            {...register("bikeRegNumber", {
              required: "Bike registration is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.bikeRegNumber && (
            <p className="text-red-500 text-sm">
              {errors.bikeRegNumber.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-2 my-2">
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Rider Application
          </button>
        </div>

        {/* form ends here */}
      </form>
    </div>
  );
};

export default BeARider;
