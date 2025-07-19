import { FaCheckCircle } from "react-icons/fa";

const CouponCard = ({ code, description, discount, status }) => {
  console.log(code, description, discount, status);

  return (
    <div className="flex flex-col gap-4 shadow-teal-300 shadow-2xl bg-teal-900 text-white rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-center">
        {/* Left Box */}
        <div className="border font-bold w-24 h-24 sm:w-32 sm:h-32 border-dashed flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-4xl">${discount}</h1>
        </div>

        {/* Middle Text */}
        <div className="flex-1 flex flex-col sm:justify-center gap-1">
          <h1 className="text-lg sm:text-2xl font-semibold">{description}</h1>
          <p className="text-sm flex items-center gap-1 border border-dashed w-fit px-2 text-success">
            {code}
          </p>

          <p className="text-sm flex items-center gap-1 text-success">
            <FaCheckCircle className="text-success" />
            Code Verified
          </p>
        </div>

        {/* Right Button */}
        <div className="w-full sm:w-auto flex justify-start sm:justify-end items-center">
          <button className="btn btn-outline w-full sm:w-auto">
            Add Coupon
          </button>
        </div>
      </div>

      <div className="px-4 py-2 bg-teal-700 text-sm sm:text-base flex justify-between">
        <p>Limited Time Offer. Grab Now!</p>
        <p className="capitalize text-sm">{status}</p>
      </div>
    </div>
  );
};

export default CouponCard;
