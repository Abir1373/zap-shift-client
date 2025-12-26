import React from "react";

const Frequently_Asked_Question_Accordion = ({ info }) => {
  const { qus, ans } = info;
  return (
    <div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">{qus}</div>
        <div className="collapse-content text-sm">{ans}</div>
      </div>
    </div>
  );
};

export default Frequently_Asked_Question_Accordion;
