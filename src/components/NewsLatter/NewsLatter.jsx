import React from 'react';
import { FiMail } from 'react-icons/fi';

const NewsLatter = () => {
  return (
    <section className="bg-teal-800 py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Stay Updated with Horizon Tower
        </h2>
        <p className="text-teal-100 mb-8">
          Subscribe to our newsletter for the latest offers, events, and updates from our smart residential complex.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-2/3"
          />
          <button className="btn bg-white text-teal-800 hover:bg-teal-100 w-full sm:w-1/3 flex items-center justify-center gap-2">
            <FiMail />
            Subscribe
          </button>
        </div>
        <p className="text-teal-200 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsLatter;
