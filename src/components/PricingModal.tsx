import React from "react";
import PricingCard from "./PricingCard";
import { PRICING_PLANS } from "../utils/razorpay";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
}

const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  userName,
}) => {
  const handlePaymentSuccess = (paymentId: string, planName: string) => {
    console.log(
      `Payment successful! Payment ID: ${paymentId}, Plan: ${planName}`
    );
    // Here you can implement logic to:
    // 1. Update user's subscription status
    // 2. Send payment confirmation to backend
    // 3. Show success message
    // 4. Redirect to dashboard or premium features

    alert(`Payment successful! Welcome to ${planName}!`);
    onClose();
  };

  const handlePaymentFailure = (error: Error | unknown) => {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-4 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-black text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
            <p className="text-gray-300">
              Unlock premium features and take your development to the next
              level
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PricingCard
              plan={PRICING_PLANS.BASIC}
              userEmail={userEmail}
              userName={userName}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
            />
            <PricingCard
              plan={PRICING_PLANS.PRO}
              isPopular={true}
              userEmail={userEmail}
              userName={userName}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
            />
            <PricingCard
              plan={PRICING_PLANS.ENTERPRISE}
              userEmail={userEmail}
              userName={userName}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              All plans include a 7-day free trial. Cancel anytime.
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure Payment
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Instant Access
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
