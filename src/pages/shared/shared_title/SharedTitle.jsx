import React from "react";

const SharedTitle = ({ title, description }) => {
  return (
    <div className="flex flex-col text-center m-5 ">
      <h2 className="text-4xl font-bold m-5 text-lime-300"> {title} </h2>
      <p className="mb-5"> {description} </p>
    </div>
  );
};

export default SharedTitle;
