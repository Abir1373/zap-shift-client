import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-transform hover:scale-105 duration-300 p-6 rounded-2xl text-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Icon */}
        <div className="text-primary text-5xl">
          <Icon />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold">{title}</h3>

        {/* Description */}
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
