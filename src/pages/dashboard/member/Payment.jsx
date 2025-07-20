import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { axiosSecure } from "../../../hooks/useAxios";
import { errorAlert, successAlert } from "../../../utils/alerts";
import { Button, CircularProgress } from "@mui/material";
import { BsStripe } from "react-icons/bs";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = ({ paymentData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await axiosSecure.post("/payment/create-intent", {
          amount: paymentData.finalAmount,
          apartmentId: paymentData.apartmentId,
          month: paymentData.month,
          year: paymentData.year,
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        errorAlert(err?.response?.data || "Something went wrong.");
        navigate("/dashboard/make_payment");
      }
    };
    createIntent();
  }, [paymentData.finalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: paymentData.email,
          },
        },
      }
    );

    if (error) {
      errorAlert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      successAlert("Payment successful!");
      await axiosSecure.post("/payment/save", {
        ...paymentData,
        transactionId: paymentIntent.id,
      });
      navigate("/dashboard/payment_history");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="label">
        <span className="label-text text-base font-medium text-slate-700">
          Card Details
        </span>
      </label>

      <div
        className={`rounded-lg border p-4 transition-all duration-300 ${
          isFocused ? "border-teal-500 shadow-md" : "border-slate-300"
        }`}
      >
        <CardElement
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1E293B",
                "::placeholder": {
                  color: "#94A3B8",
                },
              },
              invalid: {
                color: "#EF4444",
              },
            },
          }}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!stripe || !clientSecret || loading}
        fullWidth
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <span className="flex justify-center items-center gap-1">
            <BsStripe className="text-xl text-white" /> Pay Now{"   "}
          </span>
        )}
      </Button>
    </form>
  );
};

const Payment = () => {
  const { state: paymentData } = useLocation();

  if (!paymentData) return <div>No payment data found</div>;

  return (
    <div className="flex justify-center px-4 pt-10">
      <div className="card w-full max-w-xl shadow-xl bg-base-100 p-6">
        <div className="card-body space-y-4">
          <h2 className="card-title text-lg text-teal-600">Payment Summary</h2>

          <div className="text-sm text-slate-700 space-y-1">
            <div>
              <span className="font-medium">Name:</span> {paymentData.name}
            </div>
            <div>
              <span className="font-medium">Email:</span> {paymentData.email}
            </div>
            <div>
              <span className="font-medium">Month:</span> {paymentData.month}
            </div>
            <div>
              <span className="font-medium">Rent:</span> ${paymentData.rent}
            </div>
            {paymentData.coupon && (
              <div>
                <span className="font-medium">Coupon:</span>{" "}
                <span className="badge badge-info badge-outline">
                  {paymentData.coupon}
                </span>
              </div>
            )}
            <div>
              <span className="font-medium">Discount:</span> $
              {paymentData.discount}
            </div>
            <div className="text-base font-bold text-gray-800">
              Total to Pay: ${paymentData.finalAmount}
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm paymentData={paymentData} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
