import React from "react";
import BenefitCard from "./BenefitCard";
import img1 from "../../../assets/live-tracking.png";
import img2 from "../../../assets/safe-delivery.png";

const Benefits = () => {
  const benefitData = [
    {
      id: 1,
      image: img1,
      title: "Live Parcel Tracking",
      description:
        "Track your parcels in real-time with accurate updates. Know the exact location of your shipment at every step, get instant notifications, and enjoy peace of mind knowing your delivery is always on schedule.",
    },
    {
      id: 2,
      image: img2,
      title: "100% Safe Delivery",
      description:
        "We ensure secure handling and guaranteed delivery. All parcels are carefully packed, handled by trained professionals, and monitored throughout transit to ensure they reach their destination safely and on time.",
    },
    {
      id: 3,
      image: img2,
      title: "24/7 Call Center Support",
      description:
        "Our team is available anytime to assist you. Whether you have questions about your shipment, need help with a delivery, or want advice on packaging, our friendly support staff is ready around the clock to provide prompt and helpful service.",
    },
  ];

  return (
    <section data-aos="flip-right" className="py-16 bg-base-200">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Benefits</h2>

        <div className="space-y-8">
          {benefitData.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
