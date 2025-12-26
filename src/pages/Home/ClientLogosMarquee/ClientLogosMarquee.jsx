import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const ClientLogosMarquee = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto">
        <h2 className="text-2xl text-center text-primary font-bold mb-6">
          Trusted by Leading Brands{" "}
        </h2>
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-24 flex items-center justify-center w-32 h-20"
            >
              <img
                src={logo}
                alt={`company-logo-${index}`}
                className="w-full h-6 object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
