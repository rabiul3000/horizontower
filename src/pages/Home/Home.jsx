import AboutBuilding from "../../components/AboutBuilding/AboutBuilding";
import Banners from "../../components/Banners/Banners";

const Home = () => {
  return (
    <div className="w-full">
      <Banners />
      <div>
        <AboutBuilding />
      </div>
    </div>
  );
};

export default Home;
