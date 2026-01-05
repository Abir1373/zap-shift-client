import React from "react";

// Sample team images (replace with your actual images)
import ceoImage from "../../assets/ceo.jpg";
import opsImage from "../../assets/ops.jpg";
import supportImage from "../../assets/help.jpg";

const About = () => {
  const features = [
    {
      title: "Fast & Reliable",
      icon: "⏱️",
      description: "Quick and on-time deliveries for all customers.",
    },
    {
      title: "Secure Deliveries",
      icon: "🛡️",
      description: "Packages handled safely with utmost care.",
    },
    {
      title: "24/7 Support",
      icon: "🎧",
      description: "Always available for customer assistance.",
    },
  ];

  const team = [
    { name: "John Doe", role: "Founder & CEO", img: ceoImage },
    { name: "Jane Smith", role: "Operations Manager", img: opsImage },
    { name: "Emily Johnson", role: "Customer Support Lead", img: supportImage },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">About Us</h1>
        <p className="text-lg text-gray-600">
          Learn more About Our Delivery Service
        </p>
      </div>

      {/* Who We Are & Mission */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="p-6 bg-slate-600 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
          <p className="text-white-600">
            ZapShift is a modern delivery service focused on speed, reliability,
            and customer satisfaction.
          </p>
        </div>
        <div className="p-6 bg-slate-600 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-white-600">
            Our mission is to make deliveries seamless, secure, and fast,
            connecting businesses and customers efficiently.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-slate-600 shadow rounded-lg">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-white-500">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="p-6 bg-slate-600 shadow rounded-lg">
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-white-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
