import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SharedTitle from "../../shared/shared_title/SharedTitle";

const testimonials = [
  {
    id: 1,
    description:
      "The delivery service is incredibly fast and reliable. I tracked my parcel in real-time, and it arrived even earlier than expected.",
    person_name: "Sarah Johnson",
    designation: "E-commerce Store Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    description:
      "We use this company for all our corporate shipments. Secure handling, excellent support, and timely delivery every time.",
    person_name: "Michael Lee",
    designation: "Logistics Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    description:
      "The 24/7 support team is fantastic! They always respond quickly and go above and beyond to help customers.",
    person_name: "Emily Carter",
    designation: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 4,
    description:
      "I trust them with both personal and business deliveries. The service is transparent, affordable, and reliable.",
    person_name: "James Patel",
    designation: "Freelance Designer",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 5,
    description:
      "Excellent service! The staff is friendly, the system is simple to use, and deliveries are always on time.",
    person_name: "Laura Martinez",
    designation: "Event Planner",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];

const TestimonialCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const msg = "What our customers are sayings";
  const description =
    "Enhance posture , mobility , and well-being effortlessly with Posture Pro. Achieve proper allingment , reduce pain and strengthen your body with ease!";
  return (
    <div className="flex flex-col">
      <SharedTitle title={msg} description={description} />
      <div
        data-aos="flip-up"
        className="card w-full max-w-lg mx-auto bg-base-100 shadow-xl p-6 rounded-2xl"
      >
        {/* Description */}
        <p className="text-white text-center mb-6 italic">
          "{testimonials[currentIndex].description}"
        </p>

        {/* User Info with Vertical Divider */}
        <div className="flex items-center justify-center gap-6">
          {/* Left: User Image */}
          <div className="flex items-center">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].person_name}
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
          </div>

          {/* Vertical Dotted Divider */}
          <div className="h-16 border-l-2 border-dotted border-gray-400"></div>

          {/* Right: Name + Designation */}
          <div>
            <h3 className="font-bold text-lg">
              {testimonials[currentIndex].person_name}
            </h3>
            <p className="text-sm text-gray-500">
              {testimonials[currentIndex].designation}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="btn btn-circle btn-outline bg-lime-300 text-black"
          >
            <FaArrowLeft />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-lime-300" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="btn btn-circle btn-outline text-black bg-lime-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
