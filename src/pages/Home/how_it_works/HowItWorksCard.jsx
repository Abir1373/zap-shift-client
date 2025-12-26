import React from "react";

const HowItWorksCard = ({ info }) => {
  const { icon, title, description } = info;
  return (
    <div className="card w-72 bg-base-100 shadow-xl border border-base-300 hover:scale-105 transition-transform duration-300">
      <div className="card-body items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="card-title text-lg font-semibold">{title}</h3>
        <p className="text-sm text-base-content/70">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
