import React from "react";
import img from "../../../assets/location-merchant.png";
const BeMerchant = () => {
  return (
    <div
      data-aos="flip-left"
      className="bg-[url('assets/be-a-merchant-bg.png')] bg-base-200 p-20 bg-no-repeat"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={img} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">
            Merchant & Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6">
            We offer the lower delivery charge with highest value along with
            100% safety of our product . Pathao courier delivers your parcel in
            every corner of Bangladesh right on time .
          </p>
          <button className="btn btn-primary text-primary hover:text-black rounded-full btn-outline">
            Get Started
          </button>
          <button className="btn btn-primary text-primary hover:text-black rounded-full btn-outline ms-4">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
