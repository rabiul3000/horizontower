import {
  FaRulerCombined,
  FaBed,
  FaLayerGroup,
  FaDollarSign,
} from "react-icons/fa";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const AboutBuilding = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col w-full gap-12 bg-gradient-to-b to-teal-950 from-teal-950 text-white"
    >
      <div className="lg:w-8/12 w-11/12 h-full flex flex-col lg:items-start items-center gap-8 py-24 mx-auto">
        <motion.div custom={0} variants={fadeUp}>
          <button className="btn glass text-white">About The Building</button>
        </motion.div>

        <motion.div
          className="flex lg:flex-row flex-col gap-4 justify-center"
          custom={1}
          variants={fadeUp}
        >
          <div>
            <h1 className="text-4xl w-fit">
              Horizon Tower - Smart Residential Complex
            </h1>
          </div>
          <div className="flex justify-end">
            <p className="lg:w-2/3 text-gray-300">
              Perfect for professionals, couples, or small families, this
              apartment combines comfort, convenience, and a clean contemporary
              style.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col lg:gap-4 gap-8"
          custom={2}
          variants={fadeUp}
        >
          <p>
            <span className="text-2xl">H</span>orizon Tower is a modern, mid-rise
            smart apartment complex designed for urban families and working
            professionals. The building consists of
            <li>5 floors,</li>
            <li>with 4 apartments on each floor,</li>
            <li>totaling 20 units.</li>
            Each apartment is equipped with smart utilities and digital access
            to essential building services.
          </p>

          <ul>
            <li className="text-2xl pb-1">Residents enjoy:</li>
            <li>24/7 security and digital visitor logs.</li>
            <li>Automated maintenance request system.</li>
            <li>Individual utility tracking (water, gas, electricity).</li>
            <li>Community announcements and event updates.</li>
            <li>A secure payment portal for rent and service bills.</li>
          </ul>

          <ul>
            <li className="text-2xl pb-1">
              The building also includes shared amenities like:
            </li>
            <li>Rooftop garden</li>
            <li>Gym</li>
            <li>Co-working lounge</li>
            <li>Underground parking</li>
          </ul>

          <p>
            HomeHorizon aims to combine comfort, community, and technology into
            one seamless experience.
          </p>
        </motion.div>

        <motion.div
          className="w-full flex lg:flex-row flex-col gap-4 lg:justify-between justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <FaRulerCombined className="text-4xl text-white" />
            <div>
              <h3 className="text-sm font-semibold">Size</h3>
              <p className="text-sm">28 m²</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <FaBed className="text-4xl text-white" />
            <div>
              <h3 className="text-sm font-semibold">Bedrooms: 2</h3>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <FaLayerGroup className="text-4xl text-white" />
            <div>
              <h3 className="text-sm font-semibold">Floor</h3>
              <p className="text-sm">20</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <FaDollarSign className="text-4xl text-white" />
            <div>
              <h3 className="text-sm font-semibold">Price</h3>
              <p className="text-sm">$1,500/month</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutBuilding;
