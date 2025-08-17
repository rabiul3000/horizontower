import AboutBuilding from "../../components/AboutBuilding/AboutBuilding";
import Amenities from "../../components/Amenities/Amenities";
import Banners from "../../components/Banners/Banners";
import Coupons from "../../components/Coupons/Coupons";
import Footer from "../../components/Footer/Footer";
import Location from "../../components/Location/Location";
import NewsLatter from "../../components/NewsLatter/NewsLatter";
import SalesPromotion from "../../components/SalesPromotion/SalesPromotion";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="w-full">
      <Banners />
      <AboutBuilding />
      <Coupons />
      <Amenities />
      <SalesPromotion />
      <Testimonials />
      <NewsLatter />
      <Location />
      <Footer />
    </div>
  );
};

export default Home;
