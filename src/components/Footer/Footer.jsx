import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-teal-950 to-teal-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-start gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h2 className="text-2xl font-bold">HomeHorizon</h2>
          <p className="text-gray-300">
            A smarter way to live — combining modern design, intelligent
            amenities, and connected community living in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Location</h3>
          <p>Rupayan City, Gazipur, Dhaka, Bangladesh</p>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Connect with us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="btn btn-sm btn-circle glass text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="btn btn-sm btn-circle glass text-white">
              <FaTwitter />
            </a>
            <a href="#" className="btn btn-sm btn-circle glass text-white">
              <FaInstagram />
            </a>
            <a href="#" className="btn btn-sm btn-circle glass text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="btn btn-sm btn-circle glass text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 text-center text-gray-400 text-sm border-t border-teal-800 pt-4">
        © {new Date().getFullYear()} HomeHorizon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
