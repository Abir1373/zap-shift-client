import React from "react";

import Frequently_Asked_Question_Accordion from "./Frequently_Asked_Question_Accordion";
import SharedTitle from "../../shared/shared_title/SharedTitle";

const Frequently_Asked_Question = () => {
  const dsc =
    "Enhance posture,mobility, and well being effortlessly with Posture Pro. Achieve proper alignment , reduce pain , and strengthen your body with ease";

  const faq_datas = [
    {
      id: 1,
      qus: "What is a posture corrector?",
      ans: "A posture corrector is a device or garment designed to help you maintain proper body alignment by supporting your back, shoulders, and neck. It helps reduce slouching, relieve muscle strain, and encourage better posture habits.",
    },
    {
      id: 2,
      qus: "How does a posture corrector work?",
      ans: "A posture corrector works by gently pulling your shoulders back and aligning your spine into a neutral position. This trains your muscles to maintain proper posture even when you're not wearing the device.",
    },
    {
      id: 3,
      qus: "Who should use a posture corrector?",
      ans: "Posture correctors are suitable for people who spend long hours sitting, have back or neck pain, or struggle with slouching. They can also be helpful for individuals recovering from injuries that affect posture.",
    },
    {
      id: 4,
      qus: "Can you wear a posture corrector all day?",
      ans: "It is not recommended to wear a posture corrector all day. Most experts suggest wearing it for 1–3 hours per day to train your muscles gradually without becoming dependent on it.",
    },
    {
      id: 5,
      qus: "Are posture correctors safe to use?",
      ans: "Yes, posture correctors are generally safe when used properly and for limited durations. However, overuse or improper fitting can cause discomfort or muscle weakness, so proper guidance is important.",
    },
    {
      id: 6,
      qus: "Can posture correctors help relieve back pain?",
      ans: "Yes, posture correctors can help relieve mild to moderate back pain by improving spinal alignment and reducing strain on muscles. However, they should be combined with exercises and ergonomic habits for best results.",
    },
    {
      id: 7,
      qus: "What are the types of posture correctors available?",
      ans: "There are several types, including shoulder braces, back support belts, smart posture trainers, and ergonomic clothing. Each type offers different levels of support and comfort depending on the user’s needs.",
    },
  ];

  return (
    <div aos-data="flip-left" flex flex-col m-5>
      <SharedTitle title="Frequently Asked Question(FAQ)" description={dsc} />
      <div className="m-5">
        {faq_datas.map((data, id) => (
          <Frequently_Asked_Question_Accordion key={id} info={data} />
        ))}
      </div>
    </div>
  );
};

export default Frequently_Asked_Question;
