import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banners/banner1.jpg";
import banner2 from "../../assets/banners/banner2.jpg";
import banner3 from "../../assets/banners/banner3.jpg";
import banner4 from "../../assets/banners/banner4.jpg";

const Banners = () => {
  const slides = [banner1, banner2, banner3, banner4];

  return (
    <div className="w-full h-screen">
      <Carousel
        //   autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={3000}
        transitionTime={500}
        stopOnHover={false}
        swipeable={false}
      >
        {slides.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`banner${index + 1}`}
              className="w-full h-screen object-cover"
            />
            {/* Teal gradient overlay */}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-950 flex flex-col items-center justify-center text-white">
              <h1 className="lg:text-5xl text-2xl font-normal mb-6 text-center drop-shadow-lg">
                Find your perfect home with us!
              </h1>
              <p className="mb-6 text-center drop-shadow-lg lg:w-full w-1/2">
                Beautiful 2-bedroom apartment just steps from downtown
              </p>
              <div className="flex flex-col lg:flex-row  gap-4">
                <button className="btn glass px-6 text-white">
                  Search a Room
                </button>
                <button className="btn px-6">Login</button>
              </div>

              <div className="flex flex-col lg:flex-row lg:m-24 my-6 gap-3 lg:gap-24">
                <p>5 minute to Metro Station</p>
                <p>3 minute to Super Mall</p>
                <p>12 minute to Airport</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banners;
