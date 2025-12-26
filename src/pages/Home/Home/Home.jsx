import Banner from "../Banner/Banner";
import BeMerchant from "../bemerchant/BeMerchant";
import Benefits from "../benefits/Benefits";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import Frequently_Asked_Question from "../frequentyly_asked_question/Frequently_Asked_Question";
import HowItWorks from "../how_it_works/HowItWorks";
import Services from "../services/Services";
import TestimonialCard from "../testimonial/TestimonialCard";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Services />
      <ClientLogosMarquee />
      <Benefits />
      <BeMerchant />
      <TestimonialCard />
      <Frequently_Asked_Question />
    </div>
  );
};

export default Home;
