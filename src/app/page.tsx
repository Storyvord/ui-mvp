
import Navbar from "@/components/homepage/Navbar";
import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import Work from "@/components/homepage/Work";
import GetStarted from "@/components/homepage/GetStarted";
import Location from "@/components/homepage/Location";
import Testimonials from "@/components/homepage/Testimonials";
import Footer from "@/components/homepage/Footer";

const Page = () => {
  return (
    <div className="width-full overflow-x-hidden">
      <Navbar/>
      <Hero />
      <About />
      <Work />
      <GetStarted />
      <Location />
      <Testimonials />
      <Footer/> 
    </div>
  );
};

export default Page;
