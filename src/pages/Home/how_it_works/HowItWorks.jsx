// how_it_works/HowItWorks.jsx
import React from "react";
import Marquee from "react-fast-marquee";
import HowItWorksCard from "./HowItWorksCard";

import {
  FaUserCheck,
  FaCogs,
  FaChartLine,
  FaSmile,
  FaMobileAlt,
  FaCloudUploadAlt,
  FaLock,
  FaHeadset,
  FaRocket,
  FaLightbulb,
  FaCalendarCheck,
  FaHeart,
} from "react-icons/fa";

const HowItWorks = () => {
  const howItWorksData = [
    {
      id: 1,
      icon: <FaUserCheck className="text-5xl text-primary" />,
      title: "Step 1: Sign Up",
      description:
        "Create your account quickly and start exploring all features instantly.",
    },
    {
      id: 2,
      icon: <FaCogs className="text-5xl text-secondary" />,
      title: "Step 2: Customize Settings",
      description:
        "Adjust your preferences and tailor the platform to fit your workflow.",
    },
    {
      id: 3,
      icon: <FaChartLine className="text-5xl text-accent" />,
      title: "Step 3: Analyze Progress",
      description:
        "Keep track of your performance and growth using detailed analytics.",
    },
    {
      id: 4,
      icon: <FaSmile className="text-5xl text-success" />,
      title: "Step 4: Enjoy Simplicity",
      description:
        "Experience an intuitive interface that makes everything effortless.",
    },
    {
      id: 5,
      icon: <FaMobileAlt className="text-5xl text-info" />,
      title: "Step 5: Use on Any Device",
      description:
        "Access your data from mobile, tablet, or desktop without limitations.",
    },
    {
      id: 6,
      icon: <FaCloudUploadAlt className="text-5xl text-warning" />,
      title: "Step 6: Cloud Sync",
      description:
        "All your information is automatically synced securely to the cloud.",
    },
    {
      id: 7,
      icon: <FaLock className="text-5xl text-error" />,
      title: "Step 7: Data Protection",
      description:
        "We use advanced encryption to ensure your privacy and security.",
    },
    {
      id: 8,
      icon: <FaHeadset className="text-5xl text-primary" />,
      title: "Step 8: Get Support",
      description:
        "Our 24/7 support team is always ready to help whenever you need assistance.",
    },
    {
      id: 9,
      icon: <FaRocket className="text-5xl text-secondary" />,
      title: "Step 9: Launch Your Journey",
      description:
        "Take your project or goal to the next level with our powerful tools.",
    },
    {
      id: 10,
      icon: <FaLightbulb className="text-5xl text-accent" />,
      title: "Step 10: Learn & Improve",
      description:
        "Gain insights and tips to continuously improve your efficiency and skills.",
    },
    {
      id: 11,
      icon: <FaCalendarCheck className="text-5xl text-success" />,
      title: "Step 11: Stay Organized",
      description:
        "Plan ahead, manage tasks, and meet your deadlines effortlessly.",
    },
    {
      id: 12,
      icon: <FaHeart className="text-5xl text-error" />,
      title: "Step 12: Love the Results",
      description:
        "Enjoy the satisfaction of achieving your goals with confidence.",
    },
  ];
  return (
    <div className="py-10 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
      <Marquee pauseOnHover={true} speed={50}>
        <div className="flex gap-6 px-4">
          {howItWorksData.map((data, id) => (
            <HowItWorksCard key={id} info={data} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default HowItWorks;
