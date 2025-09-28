import React from "react";
import { CrownIcon } from "../assets/icons/icons";
import IconWrapper from "../utils/IconWrapper";

interface PremiumCardProps {
  title: string;
  description: string;
  price: number;
  onPayNow: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  title,
  description,
  price,
  onPayNow,
}) => {
  return (
    <div className="h-[600px] flex justify-center bg-slate-900 p-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
        {/* Header with Crown */}
        {/* <div className="bg-black h-[200px] text-white p-6 text-center relative">
          <div className="mb-4 h-[200px]">
            <IconWrapper className="w-[50px] h-[50px] mx-auto text-yellow-500 mb-4">
              <CrownIcon />
            </IconWrapper>
            <h2 className="text-2xl font-bold">Premium Content</h2>
          </div>

          <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold inline-block">
            PREMIUM
          </div>
        </div> */}

        <div className="bg-black h-[200px] text-white flex justify-center items-center flex-col">
          <div className="w-[80px] h-[80px]">
            <CrownIcon />
          </div>
          <h2 className="text-[18px] font-bold">Premium Content</h2>

          <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold inline-block mt-5">
            PREMIUM
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{description}</p> */}

          {/* Price */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ₹{price}
            </div>
            <div className="text-sm text-gray-500">One-time payment</div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Full access to this code
              </li>
              {/* <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Advanced features unlocked
              </li> */}
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Priority support
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Lifetime access
              </li>
            </ul>
          </div>

          {/* Pay Now Button */}
          <button
            onClick={onPayNow}
            className="w-full cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <IconWrapper className="w-5 h-5">
              <CrownIcon />
            </IconWrapper>
            <span>Pay Now</span>
          </button>

          {/* Security Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              🔒 Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
