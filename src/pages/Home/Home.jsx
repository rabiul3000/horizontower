import AboutBuilding from "../../components/AboutBuilding/AboutBuilding";
import Banners from "../../components/Banners/Banners";
import Coupons from "../../components/Coupons/Coupons";
import Footer from "../../components/Footer/Footer";
import Location from "../../components/Location/Location";

const Home = () => {
  return (
    <div className="w-full">
      <Banners />
      <AboutBuilding />
      <Coupons />
      <Location />
      <Footer />
    </div>
  );
};

export default Home;
