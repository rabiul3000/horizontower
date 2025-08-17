import React from "react";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    name: "Jessica Renly",
    role: "Software Engineer",
    photo: "https://i.pravatar.cc/150?img=32",
    quote:
      "Living at Horizon Tower has been amazing! The amenities and smart services make life so convenient.",
    rating: 5,
  },
  {
    name: "Sarah Smith",
    role: "Marketing Manager",
    photo: "https://i.pravatar.cc/150?img=47",
    quote:
      "I love the community vibes here. Rooftop garden and co-working lounge are my favorites!",
    rating: 4,
  },
  {
    name: "Michael Johnson",
    role: "Entrepreneur",
    photo: "https://i.pravatar.cc/150?img=12",
    quote:
      "Smart apartments with high-speed internet and secure parking make Horizon Tower perfect for professionals.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-teal-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What Our Residents Say
        </h2>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Horizon Tower is designed for comfort, convenience, and community.
          Here's what our residents think.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            <p className="text-gray-500 mb-2">{testimonial.role}</p>
            <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
