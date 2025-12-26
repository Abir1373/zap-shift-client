import React from "react";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const warehouses = useLoaderData();
  console.log(warehouses);
  return (
    <section className="p-8">
      <div className="text-center mb-8" data-aos="fade-right">
        <h2 className="text-3xl font-bold text-primary mb-2">
          We are available in 64 districts
        </h2>
      </div>

      <CoverageMap warehouses={warehouses} />
    </section>
  );
};

export default Coverage;
