import React from "react";

const BenefitCard = ({ benefit }) => {
  const { image, title, description } = benefit;
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row items-center md:items-stretch">
        {/* Left: Image */}
        <div className="bg-white w-48 md:w-40 lg:w-48 h-48 md:h-auto flex-shrink-0 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Vertical dotted divider */}
        <div className="mx-6 bg-white h-48 md:h-auto border-l-2 border-dotted border-gray-400 flex-shrink-0"></div>

        {/* Right: Title + Description (Vertically Centered) */}
        <div className="flex-1 flex flex-col justify-center mt-4 md:mt-0 text-center md:text-left">
          <h3 className="card-title text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
