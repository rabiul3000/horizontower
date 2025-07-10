import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "motion/react";

// Fix for Leaflet icons (ESM compatible)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(markerIcon2x, import.meta.url).href,
  iconUrl: new URL(markerIcon, import.meta.url).href,
  shadowUrl: new URL(markerShadow, import.meta.url).href,
});

const MapFlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.flyTo(position, 17, {
        duration: 2.5,
      });
    }, 3000); // delay in milliseconds

    return () => clearTimeout(timeout);
  }, [map, position]);

  return null;
};

const Location = () => {
  const position = [23.9987, 90.4203]; // Rupayan City, Gazipur
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <motion.section
      className="lg:py-20 py-10 bg-gradient-to-b from-teal-900 to-teal-950 text-white"
      initial="hidden"
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto lg:w-11/12 lg:text-left text-center  text-lg sm:text-xl">
        <button className="btn btn-lg  mb-6">
          Apartment Location & Directions
        </button>
        <div className="lg:flex w-full lg:pt-8 gap-6">
          <p className="flex-1">
            Our apartment is located in Rupayan City, Gazipur, Dhaka, Bangladesh
            — a peaceful and accessible residential area. To reach us, you can
            take the Dhaka–Mymensingh highway and exit at Rupayan City entrance.
            The nearest public transport options include buses and ride-sharing
            services that operate regularly in this area.
          </p>
          <div className="hidden lg:block border border-white border-dashed lg:mx-4"></div>
          <p className="flex-1 mt-6 lg:mt-0">
            Once you enter Rupayan City, follow the main road towards Horizon
            Tower, our apartment building. Parking is available on-site, and the
            building is well-signposted for easy navigation.
          </p>
        </div>
      </div>

      <div className="w-full px-4 py-10 flex justify-center">
        <div className="w-full sm:w-full lg:w-11/12 h-64 sm:h-96 lg:h-[75vh] rounded-xl overflow-hidden shadow-xl border border-gray-200">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
          >
            <MapFlyToLocation position={position} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Rupayan City, Gazipur, <br /> Dhaka, Bangladesh
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </motion.section>
  );
};

export default Location;
