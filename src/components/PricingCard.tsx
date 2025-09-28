import React from "react";
import { initiateRazorpayPayment } from "../utils/razorpay";

interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  isPopular?: boolean;
  userEmail?: string;
  userName?: string;
  onPaymentSuccess?: (paymentId: string, planName: string) => void;
  onPaymentFailure?: (error: Error | unknown) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isPopular = false,
  userEmail,
  userName,
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  const handlePayment = async () => {
    try {
      await initiateRazorpayPayment({
        amount: plan.price,
        currency: plan.currency,
        description: `${plan.name} - ${plan.description}`,
        prefill: {
          name: userName || "",
          email: userEmail || "",
        },
        onSuccess: (response) => {
          console.log("Payment successful:", response);
          if (onPaymentSuccess) {
            onPaymentSuccess(response.razorpay_payment_id, plan.name);
          }
        },
        onFailure: (error) => {
          console.error("Payment failed:", error);
          if (onPaymentFailure) {
            onPaymentFailure(error);
          }
        },
        onDismiss: () => {
          console.log("Payment modal dismissed");
        },
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      if (onPaymentFailure) {
        onPaymentFailure(error);
      }
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
        isPopular
          ? "border-black scale-105 z-10"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-3xl font-bold text-gray-900">
              ₹{plan.price}
            </span>
            <span className="text-gray-500 ml-1">/month</span>
          </div>
          <p className="text-gray-600 text-sm">{plan.description}</p>
        </div>

        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handlePayment}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isPopular
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
          }`}
        >
          Choose {plan.name}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
