import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { errorAlert } from "../../utils/alerts";

const CouponCard = ({ code, description, discount, status }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useUser();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRedirect = () => {
    if (!user) {
      errorAlert("Please login first.");
      navigate("/login", { state: { code } });
      return;
    }
    if (userRole !== "member") {
      errorAlert("You are not a member yet.");
      return;
    }
    navigate("/dashboard/make_payment", { state: { code } });
  };

  return (
    <div className="flex flex-col gap-4 shadow-teal-300 shadow-2xl bg-teal-900 text-white rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Left Box */}
        <div className="border font-bold w-24 h-24 sm:w-32 sm:h-32 border-dashed flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-4xl">${discount}</h1>
        </div>

        {/* Middle Text */}
        <div className="flex-1 w-full flex flex-col sm:justify-center gap-1">
          <h1 className="text-lg sm:text-2xl font-semibold">{description}</h1>

          <div className="flex items-center gap-2">
            <p className="text-sm border border-dashed px-2 py-1  bg-white text-black rounded">
              {code}
            </p>
            <button
              onClick={handleCopy}
              className="btn btn-xs btn-outline btn-success"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <p className="text-sm flex items-center gap-1 text-success">
            <FaCheckCircle className="text-success" />
            Code Verified
          </p>
        </div>

        {/* Right Button */}
        <div className="w-full sm:w-auto flex justify-start sm:justify-end items-center">
          <button
            className="btn btn-outline w-full sm:w-auto"
            onClick={handleRedirect}
            disabled={status !== "active"}
          >
            Add Coupon
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-2 bg-teal-700 text-sm sm:text-base">
        <p className="text-white">🕐 Limited Time Offer</p>
        {status === "active" ? (
          <p className="text-green-300 font-medium capitalize">{status}</p>
        ) : (
          <p className="text-red-300 font-medium capitalize">Not Active</p>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
