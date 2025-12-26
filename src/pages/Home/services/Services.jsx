import React from "react";
import {
  FaShippingFast,
  FaBoxOpen,
  FaTruckMoving,
  FaBusinessTime,
  FaRegSmile,
  FaMapMarkedAlt,
} from "react-icons/fa";

import ServiceCard from "./ServiceCard";

const Services = () => {
  const serviceData = [
    {
      icon: FaShippingFast,
      title: "Fast Delivery",
      description: "Swift and reliable parcel delivery, always on time.",
    },
    {
      icon: FaBoxOpen,
      title: "Secure Packaging",
      description: "Your items are handled and packed with utmost care.",
    },
    {
      icon: FaTruckMoving,
      title: "Doorstep Pickup",
      description: "We pick up parcels right from your doorstep.",
    },
    {
      icon: FaBusinessTime,
      title: "Business Solutions",
      description: "Custom logistics tailored for businesses of all sizes.",
    },
    {
      icon: FaRegSmile,
      title: "Customer Support",
      description: "Dedicated support team available 24/7.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Real-time Tracking",
      description: "Track your shipments live, anytime and anywhere.",
    },
  ];

  return (
    <section data-aos="flip-right" className="py-16 bg-base-200">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments – we deliver on
          time, every time.
        </p>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
